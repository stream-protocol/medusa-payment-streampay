import StreamPayBase from "../streampay-base";
import { PaymentIntentOptions, StreamPayOptions } from "../../types";

export class StreamPayTest extends StreamPayBase {
  constructor(_, options: StreamPayOptions) {
    super(_, options);
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {};
  }
}