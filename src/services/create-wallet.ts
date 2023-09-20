import { getCustomRepository } from 'typeorm';
import { Wallet } from '../models/wallet';
import { WalletRepository } from '../repositories/wallet';

/**
 * Create a new wallet with an initial balance.
 * @param initialBalance The initial balance to set for the new wallet.
 * @returns The created wallet entity.
 */
export async function createWallet(initialBalance: number): Promise<Wallet> {
  const walletRepository = getCustomRepository(WalletRepository);

  // Create a new wallet entity with the provided initial balance
  const newWallet = walletRepository.create({
    balance: initialBalance,
    // Add other properties as needed
  });

  // Save the new wallet entity to the database
  await walletRepository.save(newWallet);

  return newWallet;
}
