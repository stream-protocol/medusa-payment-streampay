import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from '../models/wallet';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  // Add custom repository methods if needed
}
