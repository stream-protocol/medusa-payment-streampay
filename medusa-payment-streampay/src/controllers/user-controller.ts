import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/user'; // Import your User model

const userRouter = express.Router();

// Get a list of all users
userRouter.get('/users', async (_req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
userRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(req.body); // Assuming the request body contains user data
    await userRepository.save(newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
userRouter.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOne(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user by ID
userRouter.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body; // Assuming the request body contains updated user data

    const existingUser = await userRepository.findOne(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    userRepository.merge(existingUser, updatedUserData);
    const updatedUser = await userRepository.save(existingUser);

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user by ID
userRouter.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);

    const user = await userRepository.findOne(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await userRepository.remove(user);

    return res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more user-related routes and handlers as needed

export default userRouter;
