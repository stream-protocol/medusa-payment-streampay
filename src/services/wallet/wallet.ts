import { WalletRepository } from "../../repositories/wallet";
import { Wallet } from "../../models/wallet";

export class WalletService {
  private walletRepository: WalletRepository;

  constructor() {
    this.walletRepository = new WalletRepository();
  }

  async getWalletDetails(publicKey: string): Promise<Wallet | null> {
    return this.walletRepository.findWalletByPublicKey(publicKey);
  }

  // Other business logic related to wallets
}
