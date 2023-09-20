import { Connection, Transaction, PublicKey, TransactionInstruction } from '@solana/web3.js';

class SolanaTransactionService {
  private connection: Connection;

  constructor(endpoint: string) {
    // Initialize the Solana connection
    this.connection = new Connection(endpoint, 'singleGossip');
  }

  // Create and send a Solana transaction
  async sendTransaction(
    fromWallet: PublicKey,
    instructions: TransactionInstruction[],
    feePayer: PublicKey,
  ): Promise<string> {
    try {
      const transaction = new Transaction().add(...instructions);

      // Set the fee payer for the transaction
      transaction.recentBlockhash = (
        await this.connection.getRecentBlockhash()
      ).blockhash;
      transaction.setSigners(fromWallet);
      transaction.feePayer = feePayer;

      // Sign and send the transaction
      const signedTransaction = await window.solana.signTransaction(transaction);
      const txHash = await this.connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false,
        },
      );

      return txHash;
    } catch (error) {
      console.error('Error sending Solana transaction:', error);
      throw error;
    }
  }

  // Retrieve transaction details by transaction ID
  async getTransactionDetails(transactionId: string): Promise<any> {
    try {
      const confirmedTx = await this.connection.getConfirmedTransaction(
        transactionId,
      );

      return confirmedTx;
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      throw error;
    }
  }
}

export default SolanaTransactionService;
