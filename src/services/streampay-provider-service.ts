import { PaymentProviderKeys } from "../types/payment"; // Make sure the path is correct

class StreamPayProviderService extends StreamPayBase {
  static identifier: PaymentProviderKeys = PaymentProviderKeys.STREAMPAY; // Use the correct identifier from PaymentProviderKeys
  // ...
}
