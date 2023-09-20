import StreamPayBase from "../core/streampay-base";
import { PaymentProviderKeys, PaymentProcessorError, PaymentProcessorSessionResponse } from "../types";

class StreamPayProviderService extends StreamPayBase {
  static identifier = PaymentProviderKeys.SPAY;

  constructor(_, options) {
    super(_, options);
  }

  async updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]> {
    // Implement the logic to update payment data for StreamPayments
    // You can return the updated session data or an error if needed
  }
}

export default StreamPayProviderService;
