import { StreamPayTest } from "../__fixtures__/streampay-test";
import {
  PaymentProcessorContext,
  PaymentProcessorSessionResponse,
  PaymentSessionStatus,
} from "@medusajs/medusa";
import {
  describe,
  beforeEach,
  beforeAll,
  expect,
  jest,
  it,
} from "@jest/globals";
import dotenv from "dotenv";
import {
  authorizePaymentSuccessData,
  cancelPaymentSuccessData,
  capturePaymentContextSuccessData,
  initiatePaymentContextWithExistingCustomer,
  refundPaymentSuccessData,
  responseHookData,
  retrievePaymentSuccessData,
  updatePaymentContextWithDifferentAmount,
  updatePaymentDataWithoutAmountData,
} from "../__fixtures__/data";
import { isMocksEnabled } from "../../__mocks__/streampay";
import {
  ErrorCodes,
  PaymentResponseData,
  PaymentStatusCodeValues,
  StreamPayOptions,
} from "../../types";
import { PaymentIntentDataByStatus } from "../../__fixtures__/data";
import { FindOptionsUtils } from "typeorm";
import { createPostCheckSumHeader } from "../../api/utils/utils";
import StreamPayBase from "../streampay-base";
let config: StreamPayOptions = {
  salt: "test",
  merchantId: "test",
  redirectUrl: "http://localhost:8000",
  callbackUrl: "http://localhost:9000",
  mode: "test",
  redirectMode: "POST",
};
if (!isMocksEnabled()) {
  dotenv.config();
}
const container = { logger: console };
config = {
  ...config,
  salt: process.env.STREAMPAY_SALT!,
  merchantId: process.env.STREAMPAY_MERCHANT_ACCOUNT!,
  mode: process.env.STREAMPAY_MODE as any,
};
let testPaymentSession;
let streampayTest: StreamPayTest;
jest.setTimeout(1e9);
describe("StreamPayTest", () => {
  describe("getPaymentStatus", function () {
    beforeAll(async () => {
      if (!isMocksEnabled()) {
        //    jest.requireActual("streampay");
      }

      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    if (isMocksEnabled()) {
      it("should return the correct status", async () => {
        const statusRequest = {
          merchantId: config.merchantId,
          merchantTransactionId: initiatePaymentContextWithExistingCustomer
            .paymentSessionData.merchantTransactionId as string,
          mode: config.mode,
        };

        const status = await streampayTest.getPaymentStatus(statusRequest);
        expect(status).toBe(PaymentSessionStatus.AUTHORIZED);

        /* status = await streampayTest.getPaymentStatus(statusRequest);
        expect(status).toBe(PaymentSessionStatus.CANCELED);

        status = await streampayTest.getPaymentStatus({
          request: {
            merchantId: config.merchant_id,
            merchantTransactionId: initiatePaymentContextWithExistingCustomer
              .paymentSessionData.merchantTransactionId as string,
          },
        });
        expect(status).toBe(PaymentSessionStatus.PENDING);*/
      });
    } else {
      it("should return the correct status", async () => {
        const result = await streampayTest.initiatePayment(
          initiatePaymentContextWithExistingCustomer as any
        );
        expect(result).toMatchObject({
          session_data: {
            success: true,
            code: PaymentStatusCodeValues.PAYMENT_INITIATED,
          },
        });
        const statusRequest = {
          merchantId: config.merchantId,
          merchantTransactionId: `${
            initiatePaymentContextWithExistingCustomer.paymentSessionData
              .merchantTransactionId as string
          }_${StreamPayBase.sequenceCount}`,
          mode: config.mode,
        };
        const status = await streampayTest.getPaymentStatus(statusRequest);
        expect(status).toBe(PaymentSessionStatus.AUTHORIZED);
      });
    }
  });

  describe("authorizePayment", function () {
    let streampayTest: StreamPayTest;

    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should succeed", async () => {
      if (!isMocksEnabled()) {
        testPaymentSession = await streampayTest.initiatePayment(
          initiatePaymentContextWithExistingCustomer as any
        );
      }
      const result = await streampayTest.authorizePayment(
        isMocksEnabled()
          ? authorizePaymentSuccessData
          : testPaymentSession.session_data,
        {}
      );

      expect(result).toMatchObject({
        data: isMocksEnabled()
          ? authorizePaymentSuccessData
          : {
              code: PaymentStatusCodeValues.PAYMENT_INITIATED,
            },
        status: PaymentSessionStatus.AUTHORIZED,
      });
    });
  });

  /*
  describe("cancelPayment", function () {
    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should succeed", async () => {
      const result = await streampayTest.cancelPayment(cancelPaymentSuccessData);

      expect(result).toEqual({
        code: ErrorCodes.UNSUPPORTED_OPERATION,
        error: "Unable to cancel as StreamPay doesn't support cancellation",
      });
    });

    it("should fail on intent cancellation but still return the intent", async () => {
      const result = await streampayTest.cancelPayment(
        cancelPaymentPartiallyFailData
      );

      expect(result).toEqual({
        code: ErrorCodes.UNSUPPORTED_OPERATION,
        error: "Unable to cancel as StreamPay doesn't support cancellation",
      });
    });
    /*
    it("should fail on intent cancellation", async () => {
      const result = await streampayTest.cancelPayment(cancelPaymentFailData);

      /* expect(result).toEqual({
        error: "An error occurred in cancelPayment",
        code: "",
        detail: "Error",
      });
      expect(result).toEqual({
        code: ErrorCodes.UNSUPPORTED_OPERATION,
        error: "Unable to cancel as StreamPay doesn't support cancellation",
      });
    });
  });
  */
  describe("capturePayment", function () {
    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should succeed", async () => {
      const init = (await streampayTest.initiatePayment(
        initiatePaymentContextWithExistingCustomer as any
      )) as PaymentProcessorSessionResponse;
      const result = await streampayTest.capturePayment(
        isMocksEnabled()
          ? capturePaymentContextSuccessData.paymentSessionData
          : (init.session_data as any)
      );

      if (isMocksEnabled()) {
        expect(result).toEqual({
          id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
        });
      } else {
        expect(result).toMatchObject({
          code: PaymentStatusCodeValues.PAYMENT_SUCCESS,
        });
      }
    });
  });

  describe("refundPayment", function () {
    const refundAmount = 500;

    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should refund partially", async () => {
      const init = (await streampayTest.initiatePayment(
        initiatePaymentContextWithExistingCustomer as any
      )) as PaymentProcessorSessionResponse;

      const result = await streampayTest.refundPayment(
        isMocksEnabled() ? refundPaymentSuccessData : init.session_data,
        refundAmount
      );
      if (isMocksEnabled()) {
        expect(result).toMatchObject({
          sessionid: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
        });
      } else {
        expect(result).toMatchObject({
          code: PaymentStatusCodeValues.PAYMENT_PENDING,
        });
      }
    });
    it("should refund fully", async () => {
      const init = (await streampayTest.initiatePayment(
        initiatePaymentContextWithExistingCustomer as any
      )) as PaymentProcessorSessionResponse;

      const result = await streampayTest.refundPayment(
        isMocksEnabled() ? refundPaymentSuccessData : init.session_data,
        initiatePaymentContextWithExistingCustomer.amount
      );
      if (isMocksEnabled()) {
        expect(result).toMatchObject({
          sessionid: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
        });
      } else {
        expect(result).toMatchObject({
          code: PaymentStatusCodeValues.PAYMENT_PENDING,
        });
      }
    });
  });

  describe("retrievePayment", function () {
    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should retrieve", async () => {
      const init = (await streampayTest.initiatePayment(
        initiatePaymentContextWithExistingCustomer as any
      )) as PaymentProcessorSessionResponse;

      const result = await streampayTest.retrievePayment(
        isMocksEnabled() ? retrievePaymentSuccessData : init.session_data
      );
      if (isMocksEnabled()) {
        expect(result).toMatchObject(PaymentIntentDataByStatus.PAYMENT_SUCCESS);
      } else {
        expect((result as any).code).toBeDefined();
        // expect(result.code).toBe);
        //        expect((result as any).id).toMatch("order_");
      }
    });
  });

  if (!isMocksEnabled()) {
    describe("updatePayment", function () {
      if (!isMocksEnabled()) {
        beforeAll(async () => {
          const scopedContainer = { ...container };
          streampayTest = new StreamPayTest(scopedContainer, config);
        });

        beforeEach(() => {
          jest.clearAllMocks();
        });
      }

      if (!isMocksEnabled()) {
        it("should succeed to update the intent with the new amount", async () => {
          const init = (await streampayTest.initiatePayment(
            initiatePaymentContextWithExistingCustomer as any
          )) as PaymentProcessorSessionResponse;

          const paymentContext: PaymentProcessorContext = {
            ...initiatePaymentContextWithExistingCustomer,
            amount: updatePaymentContextWithDifferentAmount.amount,
            paymentSessionData: isMocksEnabled()
              ? updatePaymentContextWithDifferentAmount.paymentSessionData
              : {
                  ...initiatePaymentContextWithExistingCustomer.paymentSessionData,
                  merchantTransactionId:
                    initiatePaymentContextWithExistingCustomer
                      .paymentSessionData.merchantTransactionId + "2",
                },
            /* email: updatePaymentContextWithDifferentAmount.email,
            currency_code:
              updatePaymentContextWithDifferentAmount.currency_code,
           
            resource_id: updatePaymentContextWithDifferentAmount.resource_id,
            context: updatePaymentContextWithDifferentAmount.context,
            */
          };
          const result = await streampayTest.updatePayment(
            isMocksEnabled()
              ? (updatePaymentContextWithDifferentAmount as any)
              : paymentContext
          );
          if (isMocksEnabled()) {
            expect(1).toBe(1);
            console.log("test not valid in mocked mode");
          }
          expect(result).toMatchObject({
            session_data: {
              data: {
                instrumentResponse: {
                  redirectInfo: {
                    url: expect.stringMatching("token="),
                  },
                },
              },
            },
          });
        }, 60e6);
      }
    });
  }

  describe("updatePaymentData", function () {
    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should succeed to update the payment data", async () => {
      const init = (await streampayTest.initiatePayment(
        initiatePaymentContextWithExistingCustomer as any
      )) as PaymentProcessorSessionResponse;
      const result = await streampayTest.updatePaymentData(
        isMocksEnabled()
          ? updatePaymentDataWithoutAmountData.sessionId
          : (init.session_data as any).data.merchantTransactionId,
        {
          ...updatePaymentDataWithoutAmountData,
          sessionId: isMocksEnabled()
            ? undefined
            : (init.session_data as any).data.merchantTransactionId,
        }
      );
      if (isMocksEnabled()) {
        //    expect(StreamPayMock.orders.edit).toHaveBeenCalled();
      }
    }, 60e6);
  });

  describe("testWebHookValidation", function () {
    beforeAll(async () => {
      const scopedContainer = { ...container };
      streampayTest = new StreamPayTest(scopedContainer, config);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("validate hook correctly", async () => {
      const signature = createPostCheckSumHeader(
        responseHookData,
        config.salt,
        ""
      );
      const result = streampayTest.constructWebhookEvent(
        signature.encodedBody,
        signature.checksum
      );
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
    });
  });
});