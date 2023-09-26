import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../models'; // Import your Transaction entity

@EntityRepository(Transaction)
class TransactionRepository extends Repository<Transaction> {
  // Add custom repository methods if needed
}

export default TransactionRepository;
