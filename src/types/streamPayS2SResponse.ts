// Import the necessary types from ../../types.ts
import {
  StreamPayS2SResponseData,
  StreamPayS2SResponse,
} from '../../types';

// Define your StreamPayS2SResponse class with the correct types
export class StreamPayS2SResponseImpl implements StreamPayS2SResponse {
  constructor(
    // Define your constructor parameters with the correct types
    public data: StreamPayS2SResponseData
  ) {}
}

// Export your StreamPayS2SResponse class
export default StreamPayS2SResponseImpl;
