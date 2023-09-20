// payment-processor-error.ts

export interface PaymentProcessorError {
  code: string; // Error code (e.g., 'invalid_request', 'payment_failed')
  message: string; // Error message providing details about the error
  field?: string; // Optional: Field name associated with the error (e.g., 'amount')
}

// Example usage:
const error: PaymentProcessorError = {
  code: 'invalid_request',
  message: 'Invalid request data',
  field: 'amount',
};

// Or, without the optional field:
const errorWithoutField: PaymentProcessorError = {
  code: 'payment_failed',
  message: 'Payment processing failed',
};
