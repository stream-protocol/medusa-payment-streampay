import { PaymentProcessor } from "medusa-interfaces";
import { SolanaConnector } from "./utils/solana-connector";

export class StreamPayProcessor extends PaymentProcessor {

export class StreamPayProcessor extends PaymentProcessor {
  private solanaConnector: SolanaConnector;
  private merchantWallet: string;

  constructor({ solanaNetwork, merchantWallet }) {
    super();
    this.solanaConnector = new SolanaConnector(solanaNetwork);
    this.merchantWallet = merchantWallet;
  }

  async getStatus(payment) {
    // Implement logic to get the status of the payment
    // For example, you can use the SolanaConnector to query the blockchain
    // and check if the payment has been confirmed
    const status = await this.solanaConnector.getPaymentStatus(payment.id);
    return status;
  }

  async authorize(payment) {
    // Implement logic to authorize the payment
    // For example, you can use the SolanaConnector to create a transaction
    // on the blockchain and return the transaction id
    const transactionId = await this.solanaConnector.createTransaction({
      amount: payment.amount,
      to: this.merchantWallet,
    });
    return transactionId;
  }

  async capture(payment) {
    // Implement logic to capture the payment
    // For example, you can use the SolanaConnector to confirm the transaction
    // on the blockchain and return the confirmation status
    const confirmationStatus = await this.solanaConnector.confirmTransaction(payment.transactionId);
    return confirmationStatus;
  }

  async refund(payment) {
    // Implement logic to refund the payment
    // For example, you can use the SolanaConnector to create a refund transaction
    // on the blockchain and return the transaction id
    const refundTransactionId = await this.solanaConnector.createRefundTransaction({
      amount: payment.amount,
      to: payment.customerWallet,
    });
    return refundTransactionId;
  }

  async cancel(payment) {
    // Implement logic to cancel the payment
    // For example, you can use the SolanaConnector to cancel the transaction
    // on the blockchain and return the cancellation status
    const cancellationStatus = await this.solanaConnector.cancelTransaction(payment.transactionId);
    return cancellationStatus;
  }
}
