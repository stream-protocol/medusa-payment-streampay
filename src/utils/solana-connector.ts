import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";

export class SolanaConnector {
  private connection: Connection;
  private merchantWallet: PublicKey;

  constructor(network: string, merchantWalletAddress: string) {
    this.connection = new Connection(network);
    this.merchantWallet = new PublicKey(merchantWalletAddress);
  }

  async sendTransaction(payerWallet: PublicKey, amount: number) {
    try {
      // Validate inputs
      if (!payerWallet) {
        throw new Error("Payer wallet is required");
      }
      if (!amount || amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      // 1. Wallet Connection
      // (This should be handled by the wallet provider and not in this file)

      // 2. Transaction Creation
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: payerWallet,
          toPubkey: this.merchantWallet,
          lamports: amount,
        })
      );

      // 3. Transaction Signing
      // (This should be handled by the wallet provider and not in this file)

      // 4. Transaction Sending
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [payerWallet],
        {
          commitment: "confirmed",
        }
      );

      // 5. Transaction Confirmation
      console.log("Transaction confirmed with signature:", signature);
    } catch (error) {
      console.error("Transaction failed:", error);
      if (error instanceof Error) {
        throw new Error(`Transaction failed: ${error.message}`);
      } else {
        throw new Error("Transaction failed");
      }
    }
  }
}
