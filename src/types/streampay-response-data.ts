// stream-pay-response-data.ts

export interface StreamPayResponseData {
  // Define the properties of StreamPayResponseData here
  status: string;
  message: string;
  // Add more properties as needed
}

// Example usage:
const responseData: StreamPayResponseData = {
  status: 'success',
  message: 'Payment processed successfully',
};
