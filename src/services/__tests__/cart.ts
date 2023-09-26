import { EntityManager, EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Cart } from '../models/cart'; // Import your Cart entity model

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  // Add custom methods for your Cart repository if needed
}

export class CartService {
  private entityManager: EntityManager;

  constructor() {
    this.entityManager = getCustomRepository(CartRepository);
  }

  async createCart(cartData: Partial<Cart>): Promise<Cart> {
    const cart = this.entityManager.create(Cart, cartData);
    return await this.entityManager.save(cart);
  }

  async getCartById(cartId: number): Promise<Cart | undefined> {
    return await this.entityManager.findOne(cartId);
  }

  // Add more cart-related methods as needed
}
