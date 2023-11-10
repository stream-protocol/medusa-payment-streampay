import { Connection, PublicKey, Keypair } from '@solana/web3.js';

class WalletConnector {
  private connection: Connection;
  private wallet: Keypair | null;

  constructor() {
    this.connection = new Connection("https://api.mainnet-beta.solana.com");
    this.wallet = null;
  }

  // Connect to the wallet
  async connectWallet(privateKey: string): Promise<void> {
    try {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
      this.wallet = keypair;
      console.log('Wallet connected:', this.wallet.publicKey.toString());
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw new Error('Failed to connect wallet');
    }
  }

  // Disconnect the wallet
  disconnectWallet(): void {
    this.wallet = null;
    console.log('Wallet disconnected');
  }

  // Get the public key of the connected wallet
  getWalletPublicKey(): string {
    if (!this.wallet) {
      throw new Error('Wallet not connected');
    }
    return this.wallet.publicKey.toString();
  }

  // Check if the wallet is connected
  isWalletConnected(): boolean {
    return this.wallet !== null;
  }

  // Add other wallet-related functionalities as needed
}

export default WalletConnector;
