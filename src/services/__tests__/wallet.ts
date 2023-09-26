import { EntityManager, EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Wallet } from '../models/wallet'; // Import your Wallet entity model

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  // Add custom methods for your Wallet repository if needed
}

export class WalletService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getCustomRepository(WalletRepository);
  }

  async createWallet(walletData: Partial<Wallet>): Promise<Wallet> {
    const wallet = this.entityManager.create(Wallet, walletData);
    return await this.entityManager.save(wallet);
  }

  async getWalletById(walletId: number): Promise<Wallet | undefined> {
    return await this.entityManager.findOne(walletId);
  }

  // Add more wallet-related methods as needed
}
