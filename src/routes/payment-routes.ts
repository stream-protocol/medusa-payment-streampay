import express, { Request, Response, NextFunction } from 'express';
import { PaymentController } from './PaymentController'; // Import your PaymentController

// Create an instance of the Express router
const paymentRouter = express.Router();

// Initialize a PaymentController
const paymentController = new PaymentController();

// Define a route for initiating a payment
paymentRouter.post('/initiate-payment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the initiatePayment method from the PaymentController
    const paymentResult = await paymentController.initiatePayment(req.body);

    // Handle the payment result and send a response
    if (paymentResult.success) {
      return res.status(200).json({ message: 'Payment initiated successfully', data: paymentResult.data });
    } else {
      return res.status(400).json({ message: 'Payment initiation failed', error: paymentResult.error });
    }
  } catch (error) {
    next(error);
  }
});

// Define a route for capturing a payment
paymentRouter.post('/capture-payment', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the capturePayment method from the PaymentController
    const captureResult = await paymentController.capturePayment(req.body);

    // Handle the capture result and send a response
    if (captureResult.success) {
      return res.status(200).json({ message: 'Payment captured successfully', data: captureResult.data });
    } else {
      return res.status(400).json({ message: 'Payment capture failed', error: captureResult.error });
    }
  } catch (error) {
    next(error);
  }
});

// Define other payment-related routes as needed

export default paymentRouter;
