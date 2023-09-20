import axios from 'axios';
import { PaymentIntentOptions, StreamPayOptions } from './types';

class StreamPaymentService {
  private readonly streamPayOptions: StreamPayOptions;

  constructor(options: StreamPayOptions) {
    this.streamPayOptions = options;
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    customerEmail: string
  ): Promise<any> {
    try {
      const paymentIntentOptions: PaymentIntentOptions = {
        payment_method_types: ['card'],
        capture_method: 'automatic',
      };

      const response = await axios.post(
        this.streamPayOptions.apiUrl + '/create-payment-intent',
        {
          amount,
          currency,
          paymentIntentOptions,
          customer_email: customerEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${this.streamPayOptions.apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      throw error;
    }
  }

  async processPayment(paymentIntentId: string): Promise<any> {
    try {
      const response = await axios.post(
        this.streamPayOptions.apiUrl + '/process-payment',
        {
          payment_intent_id: paymentIntentId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.streamPayOptions.apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error.message);
      throw error;
    }
  }

  // Add more payment-related methods as needed

  async refundPayment(paymentIntentId: string, amount: number): Promise<any> {
    // Implement refund logic here
  }
}

export default StreamPaymentService;
