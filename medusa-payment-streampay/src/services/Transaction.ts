import { Transaction } from '../models'; // Import your Transaction entity
import { getRepository } from 'typeorm';

class TransactionService {
  private transactionRepository = getRepository(Transaction);

  async createTransaction(amount: number, description: string): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.description = description;

    return await this.transactionRepository.save(transaction);
  }

  async getTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getTransactionById(id: number): Promise<Transaction | undefined> {
    return await this.transactionRepository.findOne(id);
  }

  async updateTransaction(id: number, amount: number, description: string): Promise<Transaction | undefined> {
    const transaction = await this.transactionRepository.findOne(id);

    if (!transaction) {
      return undefined; // Transaction not found
    }

    transaction.amount = amount;
    transaction.description = description;

    return await this.transactionRepository.save(transaction);
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const transaction = await this.transactionRepository.findOne(id);

    if (!transaction) {
      return false; // Transaction not found
    }

    await this.transactionRepository.remove(transaction);
    return true;
  }
}

export default TransactionService;
