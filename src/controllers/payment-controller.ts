import { Request, Response } from 'express';
import { PaymentService } from '../services'; // Import your payment service

class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // Route to create a new payment
  async createPayment(req: Request, res: Response) {
    try {
      const paymentData = req.body;

      // Call the payment service to create a new payment
      const payment = await this.paymentService.createPayment(paymentData);

      res.status(201).json(payment);
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Route to process a payment
  async processPayment(req: Request, res: Response) {
    try {
      const paymentId = req.params.id;

      // Call the payment service to process the payment
      const result = await this.paymentService.processPayment(paymentId);

      if (result.success) {
        res.status(200).json({ message: 'Payment processed successfully' });
      } else {
        res.status(400).json({ error: 'Payment processing failed' });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Route to handle payment callbacks
  async handleCallback(req: Request, res: Response) {
    try {
      // Parse and handle the callback data
      const callbackData = req.body;

      // Call the payment service to handle the callback
      await this.paymentService.handleCallback(callbackData);

      // Respond to the callback
      res.status(200).send('Callback handled successfully');
    } catch (error) {
      console.error('Error handling payment callback:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default PaymentController;
