// Import necessary dependencies and types
import StreamPayBase from "../core/streampay-base";
import { PaymentIntentOptions, PaymentProviderKeys } from "../types";

// Define the StreamPayProviderService class that extends StreamPayBase
class StreamPayProviderService extends StreamPayBase {
  // Define a static identifier for this payment provider
  static identifier = PaymentProviderKeys.USDT;

  // Constructor for the StreamPayProviderService class
  constructor(_, options) {
    super(_, options); // Call the constructor of the parent class (StreamPayBase)
  }

  // Define a getter for payment intent options
  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ["USDT"],  // Specify the payment method type as "USDT"
      capture_method: "automatic",     // Set the capture method to "automatic"
    };
  }
}

// Export the StreamPayProviderService class as the default export of this module
export default StreamPayProviderService;
