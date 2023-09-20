import { StreamPayOptions, PaymentProcessorSessionResponse, PaymentProcessorError } from "../types";
import { StreamPayBase } from "./streampay-base";

// Define the StreamPayWrapper class
export class StreamPayWrapper {
  private provider: StreamPayBase;

  constructor(private options: StreamPayOptions) {
    // Initialize the StreamPay provider based on options
    // For example, you can choose the provider based on options.providerType
    // Here, we assume options.providerType is a string that matches the provider identifier
    // You should implement the logic to select the appropriate provider
    this.provider = this.getProvider(options.providerType);
  }

  // Method to update payment data
  async updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<PaymentProcessorSessionResponse["session_data"] | PaymentProcessorError> {
    return this.provider.updatePaymentData(sessionId, data);
  }

  // Add other methods for interacting with StreamPay

  // Private method to get the StreamPay provider based on the provider type
  private getProvider(providerType: string): StreamPayBase {
    // Implement the logic to select and initialize the correct StreamPay provider
    // For example, based on providerType, instantiate and return the appropriate provider
    // You should have specific StreamPay provider classes (e.g., streampay-sol.ts, streampay-spay.ts)
    // that extend StreamPayBase and return an instance of the selected provider here.
    // Ensure error handling if an invalid providerType is provided.
    // Example:
    // if (providerType === "SOL") {
    //   return new StreamPaySOL(this.options);
    // } else if (providerType === "SPAY") {
    //   return new StreamPaySPAY(this.options);
    // }
    throw new Error(`Invalid StreamPay provider type: ${providerType}`);
  }
}
