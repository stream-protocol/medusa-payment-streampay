import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cart } from '../models/cart';

const cartRouter = express.Router();

// Get a list of all carts
cartRouter.get('/carts', async (_req: Request, res: Response) => {
  try {
    const cartRepository = getRepository(Cart);
    const carts = await cartRepository.find();

    return res.json(carts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new cart
cartRouter.post('/carts', async (_req: Request, res: Response) => {
  try {
    const cartRepository = getRepository(Cart);
    const newCart = cartRepository.create();
    await cartRepository.save(newCart);

    return res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get cart by ID
cartRouter.get('/carts/:id', async (req: Request, res: Response) => {
  try {
    const cartRepository = getRepository(Cart);
    const cartId = parseInt(req.params.id);
    const cart = await cartRepository.findOne(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a product to a cart
cartRouter.post('/carts/:id/add-product', async (req: Request, res: Response) => {
  try {
    const cartRepository = getRepository(Cart);
    const cartId = parseInt(req.params.id);
    const { productId, quantity } = req.body;

    const cart = await cartRepository.findOne(cartId, { relations: ['products'] });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Implement logic to add a product to the cart and update total and quantity

    // Save the updated cart
    await cartRepository.save(cart);

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more cart-related routes and handlers as needed

export default cartRouter;
