import axios from 'axios';

// Define a service class for Solana transactions
class SolanaTransactionService {
  private solanaRpcUrl: string;

  constructor(solanaRpcUrl: string) {
    this.solanaRpcUrl = solanaRpcUrl;
  }

  async fetchTransactionDetails(transactionId: string) {
    try {
      const response = await axios.post(this.solanaRpcUrl, {
        jsonrpc: '2.0',
        id: 1,
        method: 'getTransaction',
        params: [transactionId, { encoding: 'jsonParsed' }],
      });

      if (response.data && response.data.result) {
        const transactionDetails = response.data.result;
        return transactionDetails;
      } else {
        throw new Error('Transaction not found or error in response');
      }
    } catch (error) {
      throw new Error(`Error fetching transaction details: ${error.message}`);
    }
  }
}

// Example usage
const solanaRpcUrl = 'https://api.mainnet-beta.solana.com';
const transactionId = 'your_transaction_id'; // Replace with your actual transaction ID

const transactionService = new SolanaTransactionService(solanaRpcUrl);

transactionService
  .fetchTransactionDetails(transactionId)
  .then((transactionDetails) => {
    console.log('Transaction Details:', transactionDetails);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

export default SolanaTransactionService;
