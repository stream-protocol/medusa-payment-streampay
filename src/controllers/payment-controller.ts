import express, { Request, Response } from 'express';
import PaymentService from './payment-service'; // Import your PaymentService here

const paymentRouter = express.Router();
const paymentService = new PaymentService(); // Create an instance of your PaymentService

// Route to create a payment
paymentRouter.post('/create-payment', async (req: Request, res: Response) => {
  try {
    // Extract data from the request body
    const { amount, currency, description } = req.body;

    // Call the createPayment method from PaymentService
    const payment = await paymentService.createPayment(amount, currency, description);

    // Return the payment as a response
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Route to get payment details by ID
paymentRouter.get('/get-payment/:paymentId', async (req: Request, res: Response) => {
  try {
    // Extract the payment ID from the request params
    const paymentId = req.params.paymentId;

    // Call the getPaymentById method from your PaymentService
    const payment = await paymentService.getPaymentById(paymentId);

    // Return the payment details as a response
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error getting payment details:', error);
    res.status(500).json({ error: 'Failed to get payment details' });
  }
});

// Add more payment-related routes as needed

export default paymentRouter;
