// Import the missing type interfaces from ../../types.ts
import {
  PaymentRequestUPI,
  PaymentRequestUPICollect,
  PaymentRequestUPIQr,
  RefundRequest,
  StreamPayEvent,
  PaymentResponseData,
  PaymentResponse,
  StreamPayS2SResponse,
  PaymentStatusCodeValues,
  StreamPayS2SResponseData,
} from '../../types';

// Now you can use these types in your functions
// For example:
function someFunction(paymentRequest: PaymentRequestUPI) {
  // Your function logic here
}
