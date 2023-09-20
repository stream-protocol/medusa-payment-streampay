import { StreamPayOptions, PaymentProcessorSessionResponse, PaymentProcessorError } from "../types";

// Define the StreamPayBase class
export class StreamPayBase {
  protected options: StreamPayOptions;

  constructor(_, options: StreamPayOptions) {
    this.options = options;
  }

  // Define a method to update payment data for StreamPay
  async updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<PaymentProcessorSessionResponse["session_data"] | PaymentProcessorError> {
    try {
      // Implement the logic to update payment data for StreamPay
      // You can use the provided session ID and data to update the payment
      // Return the updated session data or an error if needed
      const updatedData = {}; // Replace with actual data update logic
      return { session_data: updatedData };
    } catch (error) {
      // Handle errors and return a PaymentProcessorError
      return {
        success: false,
        error: {
          message: "Failed to update payment data.",
          code: "PAYMENT_DATA_UPDATE_ERROR",
        },
      };
    }
  }

  // Define other methods or properties common to all StreamPay providers
}
