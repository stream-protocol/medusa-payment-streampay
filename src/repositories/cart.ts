import { EntityRepository, Repository } from 'typeorm';
import { Cart } from '../models/cart'; // Import your Cart entity model

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  // Add custom methods for your Cart repository if needed
}
