// Import the necessary types from ../../types.ts
import {
  PaymentResponseData,
  PaymentResponse,
  StreamPayS2SResponse,
  PaymentStatusCodeValues,
} from '../../types';

// Define your PaymentResponse class with the correct types
export class PaymentResponseImpl implements PaymentResponse {
  constructor(
    // Define your constructor parameters with the correct types
    public data: PaymentResponseData,
    public s2s_response: StreamPayS2SResponse,
    public status: PaymentStatusCodeValues
  ) {}
}

// Export PaymentResponse class
export default PaymentResponseImpl;
