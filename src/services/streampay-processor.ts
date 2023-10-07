import StreamPay, { StreamPayTransactionAuthorization } from "../lib/streampay";

import {
  AbstractPaymentProcessor,
  PaymentProcessorContext,
  PaymentProcessorError,
  PaymentProcessorSessionResponse,
  PaymentSessionStatus,
  MedusaContainer,
  CartService,
} from "@medusajs/medusa";
import { MedusaError, MedusaErrorTypes } from "@medusajs/utils";
import { validateCurrencyCode } from "../utils/currencyCode";

export interface StreamPayProcessorConfig {
  /**
   * StreamPayment Secret Key
   *
   * Should be in the format sk_test-... or sk_live-...
   *
   * Obtainable from the StreamPayments dashboard - Settings -> API Keys & Webhooks
   *
   * https://dashboard.streampayments.app/#/settings/developers
   */
  secret_key: string;

  /**
   * Debug mode
   * If true, logs helpful debug information to the console
   * Logs are prefixed with "PS_P_Debug"
   */
  debug?: boolean;
}

class StreamPayProcessor extends AbstractPaymentProcessor {
  static identifier = "streampay";

  protected readonly cartService: CartService;
  protected readonly configuration: StreamPayProcessorConfig;
  protected readonly streampay: StreamPay;
  protected readonly debug: boolean;

  constructor(
    container: MedusaContainer,
    options: StreamPayProcessorConfig,
  ) {
    super(container);

    if (!options.secret_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "The StreamPay provider requires the secret_key option",
      );
    }

    this.configuration = options;
    this.streampay = new StreamPay(this.configuration.secret_key);
    this.debug = Boolean(options.debug);

    // @ts-expect-error - Container is just an object - https://docs.medusajs.com/development/fundamentals/dependency-injection#in-classes
    this.cartService = container.cartService;

    if (this.cartService.retrieveWithTotals === undefined) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Your Medusa installation contains an outdated cartService implementation. Update your Medusa installation.",
      );
    }
  }

  get paymentIntentOptions() {
    return {};
  }

  /**
   * Called when a user selects StreamPay as their payment method during checkout
   */
  async initiatePayment(context: PaymentProcessorContext): Promise<
    | PaymentProcessorError
    | (PaymentProcessorSessionResponse & {
        session_data: {
          streampayTxRef: string;
          streampayTxAuthData: StreamPayTransactionAuthorization;
          cartId: string;
        };
      })
  > {
    if (this.debug) {
      console.info(
        "PS_P_Debug: InitiatePayment",
        JSON.stringify(context, null, 2),
      );
    }

    const { amount, email, currency_code } = context;

    const validatedCurrencyCode = validateCurrencyCode(currency_code);

    const { data, status, message } =
      await this.streampay.transaction.initialize({
        amount: amount, // StreamPay expects amount in lowest denomination - https://streampayments.app/docs/payments/accept-payments/#initialize-transaction-1
        email,
        currency: validatedCurrencyCode,
      });

    if (status === false) {
      return this.buildError("Failed to initiate Stream payment", {
        detail: message,
      });
    }

    return {
      session_data: {
        streampayTxRef: data.reference,
        streampayTxAuthData: data,
        cartId: context.resource_id,
      },
    };
  }

  /**
   * Called when a user updates their cart after `initiatePayment` has been called
   */
  async updatePaymentData(
    _: string,
    data: Record<string, unknown>,
  ): Promise<
    PaymentProcessorSessionResponse["session_data"] | PaymentProcessorError
  > {
    if (this.debug) {
      console.info(
        "PS_P_Debug: UpdatePaymentData",
        JSON.stringify({ _, data }, null, 2),
      );
    }

    if (data.amount) {
      throw new MedusaError(
        MedusaErrorTypes.INVALID_DATA,
        "Cannot update amount from updatePaymentData",
      );
    }

    return {
      session_data: {
        ...data, // We just return the data as is
      },
    };
  }

  /**
   * Called when a cart item is added or shipping address is updated
   */
  async updatePayment(context: PaymentProcessorContext): Promise<
    | PaymentProcessorError
    | (PaymentProcessorSessionResponse & {
        session_data: {
          streampayTxRef: string;
        };
      })
  > {
    if (this.debug) {
      console.info(
        "PS_P_Debug: UpdatePayment",
        JSON.stringify(context, null, 2),
      );
    }

    // Re-initialize the payment
    return this.initiatePayment(context);
  }

  /**
   * Called when a cart is completed
   * We validate the payment and return a status
   */
  async authorizePayment(
    paymentSessionData: Record<string, unknown> & {
      streampayTxRef: string;
      cartId: string;
    },
  ): Promise<
    | PaymentProcessorError
    | {
        status: PaymentSessionStatus;
        data: Record<string, unknown>;
      }
  > {
    if (this.debug) {
      console.info(
        "PS_P_Debug: AuthorizePayment",
        JSON.stringify(paymentSessionData, null, 2),
      );
    }

    try {
      const { streampayTxRef, cartId } = paymentSessionData;

      const { status, data } = await this.streampay.transaction.verify({
        reference: streampayTxRef,
      });

      const cart = await this.cartService.retrieveWithTotals(cartId);

      if (this.debug) {
        console.info(
          "PS_P_Debug: AuthorizePayment: Verification",
          JSON.stringify({ status, cart, data }, null, 2),
        );
      }

      if (status === false) {
        // Invalid key error
        return {
          status: PaymentSessionStatus.ERROR,
          data: {
            ...paymentSessionData,
            streampayTxId: null,
            streampayTxData: data,
          },
        };
      }

      switch (data.status) {
        case "success": {
          const amountValid =
            Math.round(cart.total) === Math.round(data.amount);
          const currencyValid =
            cart.region.currency_code === data.currency.toLowerCase();

          if (amountValid && currencyValid) {
            // Successful transaction
            return {
              status: PaymentSessionStatus.AUTHORIZED,
              data: {
                streampayTxId: data.id,
                streampayTxData: data,
              },
            };
          }

          // Invalid amount or currency
          // We refund the transaction
          await this.refundPayment(
            {
              ...paymentSessionData,
              streampayTxData: data,
              streampayTxId: data.id,
            },
            data.amount,
          );

          // And return the failed status
          return {
            status: PaymentSessionStatus.ERROR,
            data: {
              ...paymentSessionData,
              streampayTxId: data.id,
              streampayTxData: data,
            },
          };
        }

        case "failed":
          // Failed transaction
          return {
            status: PaymentSessionStatus.ERROR,
            data: {
              ...paymentSessionData,
              streampayTxId: data.id,
              streampayTxData: data,
            },
          };

        default:
          // Pending transaction
          return {
            status: PaymentSessionStatus.PENDING,
            data: paymentSessionData,
          };
      }
    } catch (error) {
      return this.buildError("Failed to authorize payment", error);
    }
  }

  /**
   * Retrieve transaction data from Stream.
   */
  async retrievePayment(
    paymentSessionData: Record<string, unknown> & { streampayTxId: string },
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    if (this.debug) {
      console.info(
        "PS_P_Debug: RetrievePayment",
        JSON.stringify(paymentSessionData, null, 2),
      );
    }

    try {
      const { streampayTxId } = paymentSessionData;

      const { data, status, message } = await this.streampay.transaction.get({
        id: streampayTxId,
      });

      if (status === false) {
        return this.buildError("Failed to retrieve payment", {
          detail: message,
        });
      }

      return {
        ...paymentSessionData,
        streampayTxData: data,
      };
    } catch (error) {
      return this.buildError("Failed to retrieve payment", error);
    }
  }

  /**
   * Refunds payment for Stream transaction
   */
  async refundPayment(
    paymentSessionData: Record<string, unknown> & { streampayTxId: number },
    refundAmount: number,
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    if (this.debug) {
      console.info(
        "PS_P_Debug: RefundPayment",
        JSON.stringify({ paymentSessionData, refundAmount }, null, 2),
      );
    }

    try {
      const { streampayTxId } = paymentSessionData;

      const { data, status, message } = await this.streampay.refund.create({
        transaction: streampayTxId,
        amount: refundAmount,
      });

      if (status === false) {
        return this.buildError("Failed to refund payment", {
          detail: message,
        });
      }

      return {
        ...paymentSessionData,
        streampayTxData: data,
      };
    } catch (error) {
      return this.buildError("Failed to refund payment", error);
    }
  }

  /**
   * Returns StreamPay transaction status
   */
  async getPaymentStatus(
    paymentSessionData: Record<string, unknown> & { streampayTxId?: string },
  ): Promise<PaymentSessionStatus> {
    if (this.debug) {
      console.info(
        "PS_P_Debug: GetPaymentStatus",
        JSON.stringify(paymentSessionData, null, 2),
      );
    }

    const { streampayTxId } = paymentSessionData;

    if (!streampayTxId) {
      return PaymentSessionStatus.PENDING;
    }

    try {
      const { data, status } = await this.streampay.transaction.get({
        id: streampayTxId,
      });

      if (status === false) {
        return PaymentSessionStatus.ERROR;
      }

      switch (data?.status) {
        case "success":
          return PaymentSessionStatus.AUTHORIZED;
        case "failed":
          return PaymentSessionStatus.ERROR;
        default:
          return PaymentSessionStatus.PENDING;
      }
    } catch (error) {
      return PaymentSessionStatus.ERROR;
    }
  }

  /**
   * Marks payment as captured. Transactions are 'captured' by default in Stream.
   * So this just returns the payment session data.
   */
  async capturePayment(
    paymentSessionData: Record<string, unknown>,
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    return paymentSessionData;
  }

  /**
   * Cancel payment for Stream Payment intent.
   * This is not supported by StreamPay - transactions are stateless.
   */
  async cancelPayment(
    paymentSessionData: Record<string, unknown>,
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    return paymentSessionData;
  }
  /**
   * Delete payment for Stream Payment intent.
   * This is not supported by StreamPay - transactions are stateless.
   */
  async deletePayment(
    paymentSessionData: Record<string, unknown>,
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    return paymentSessionData;
  }

  protected buildError(
    message: string,
    e:
      | {
          code?: string;
          detail: string;
        }
      | Error,
  ): PaymentProcessorError {
    return {
      error: "Stream Payment error: " + message,
      code: "code" in e ? e.code : "STREAM_PAYMENT_ERROR",
      detail: "detail" in e ? e.detail : e.message ?? "",
    };
  }
}

export default StreamPayProcessor;