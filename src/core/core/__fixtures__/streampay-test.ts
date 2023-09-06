import StreamPayBase from "../streampay-base"
import { PaymentIntentOptions } from "../../types"

export class StreamPayTest extends StreamPayBase {
  constructor(_, options) {
    super(_, options)
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {}
  }
}