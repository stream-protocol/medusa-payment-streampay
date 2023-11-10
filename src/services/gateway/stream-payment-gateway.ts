import axios from 'axios';

class StreamPaymentGateway {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = 'https://api.gateway.streampayments.org'; // Replace with Stream Payment Gateway's API URL
    this.apiKey = process.env.STREAM_PAYMENT_GATEWAY_API_KEY; // Ensure this is set in your environment
  }

  // Method to create a new transaction
  async createTransaction(amount: number, currency: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/transactions`, {
        amount,
        currency,
        apiKey: this.apiKey,
      });
      return response.data.transactionId;
    } catch (error) {
      throw new Error(`Error creating transaction: ${error.message}`);
    }
  }

  // Add other necessary methods like processPayment, refundTransaction, etc.

  // Example method to process a payment
  async processPayment(transactionId: string): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/process-payment`, {
        transactionId,
        apiKey: this.apiKey,
      });
      // Handle response or update status as needed
    } catch (error) {
      throw new Error('Error processing payment');
    }
  }

  // Example method to get transaction status
  async getTransactionStatus(transactionId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/transaction-status`, {
        params: { transactionId, apiKey: this.apiKey },
      });
      return response.data.status;
    } catch (error) {
      throw new Error('Error fetching transaction status');
    }
  }

  // Add more methods as required for your payment gateway
}

export default StreamPaymentGateway;
