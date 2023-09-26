import express, { Router } from 'express';
import UserController from '../controllers/user-controller'; // Import your UserController

const router: Router = express.Router();
const userController: UserController = new UserController(); // Create an instance of UserController

// Define user-related routes

// Route to create a new user
router.post('/users', userController.createUser);

// Route to retrieve all users
router.get('/users', userController.getAllUsers);

// Route to retrieve a user by ID
router.get('/users/:id', userController.getUserById);

// Route to update a user by ID
router.put('/users/:id', userController.updateUserById);

// Route to delete a user by ID
router.delete('/users/:id', userController.deleteUserById);

// Add more user-related routes as needed

export default router;
