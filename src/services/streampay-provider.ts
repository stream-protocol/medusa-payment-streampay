import StreamPayBase from "../core/streampay-base";
import { PaymentIntentOptions, PaymentProviderKeys } from "../types";

class StreamPayProviderService extends StreamPayBase {
  static identifier = PaymentProviderKeys.STREAMPAY;

  constructor(_, options) {
    super(_, options);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {};
  }
}

export default StreamPayProviderService;