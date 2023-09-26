import { AbstractPaymentService, Cart, Data, Payment, PaymentSession, PaymentSessionStatus } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { Connection, PublicKey, Transaction } from "@solana/web3.js"; // Import the necessary Solana modules
import { StreamPayment } from "../models/stream-payment"; // Adjust the import path based on StreamPay project structure
import { StreamPaymentRepository } from "../repositories/stream-payment"; // Adjust the import path based on StreamPay project structure

class StreamPaymentService extends AbstractPaymentService {
  private streamPaymentRepository: StreamPaymentRepository;
  private connection: Connection;

  constructor(entityManager: EntityManager, connection: Connection) {
    super(entityManager);
    this.streamPaymentRepository = entityManager.getCustomRepository(StreamPaymentRepository);
    this.connection = connection;
  }

  async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
    // Implement logic to get payment data for StreamPay (SOL)
    // Include StreamPay (SOL)-specific details here

    // Calculate the total amount with fees and taxes
    const totalAmount = this.calculateTotalAmount(paymentSession.cart.total);

    const paymentData: Data = {
      paymentMethod: "SOL",
      amount: totalAmount,
      // Add other payment data fields, such as SOL-specific details
    };

    return paymentData;
  }

  async createPayment(cart: Cart): Promise<Data> {
    // Implement logic to create a SOL payment
    // You can create a payment request or transaction here
    // Include SOL-specific details as needed

    // Calculate the total amount with fees and taxes
    const totalAmount = this.calculateTotalAmount(cart.total);

    const paymentData: Data = {
      paymentMethod: "SOL",
      amount: totalAmount,
      // Add other payment data fields, such as SOL-specific details
    };

    return paymentData;
  }

  async capturePayment(payment: Payment): Promise<Data> {
    // Implement logic to capture a StreamPay (SOL) payment
    // You can mark the payment as captured or complete here
    // Include SOL-specific details as needed

    const capturedPayment: Data = {
      status: PaymentSessionStatus.CAPTURED,
      // Add other captured payment details as needed
    };

    return capturedPayment;
  }

  // Implement other payment-related methods as needed for StreamPay

  // Add any additional methods or logic specific to StreamPayments™

  private calculateTotalAmount(cartTotal: number): number {
    // Calculate StreamPayments operational / commission fees (e.g., 1.5%)
    const operationalFeesPercentage = 1.5;
    const operationalFees = (cartTotal * operationalFeesPercentage) / 100;

    // Calculate local tax fees (e.g., VAT)
    const localTaxFees = (cartTotal * this.taxRate) / 100;

    // Calculate donation (if provided)
    const donation = 0; // Replace with the actual donation amount from the charity wallet

    // Calculate the total amount with all fees and taxes
    const totalAmount =
      cartTotal + operationalFees + localTaxFees - donation;

    return totalAmount;
  }
}

export default StreamPaymentService;
