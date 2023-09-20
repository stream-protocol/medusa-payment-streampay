import axios from 'axios';

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
      throw new Error('Error fetching transaction details: ' + error.message);
    }
  }
}

export default SolanaTransactionService;
