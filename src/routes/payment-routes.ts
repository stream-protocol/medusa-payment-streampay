import { Router, Request, Response } from "express";
import PaymentController from "../controllers/payment-controller";

const router = Router();
const paymentController = new PaymentController();

// Route to create a payment
router.post("/payments", async (req: Request, res: Response) => {
  try {
    // Extract data from the request body
    const { amount, currency, description } = req.body;

    // Call the createPayment method from PaymentController
    const payment = await paymentController.createPayment(amount, currency, description);

    // Return the payment as a response
    res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// Route to get payment details by ID
router.get("/payments/:paymentId", async (req: Request, res: Response) => {
  try {
    // Extract the payment ID from the request params
    const paymentId = req.params.paymentId;

    // Call the getPaymentById method from PaymentController
    const payment = await paymentController.getPaymentById(paymentId);

    // Return the payment details as a response
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error getting payment details:", error);
    res.status(500).json({ error: "Failed to get payment details" });
  }
});

// Add more payment-related routes as needed

export default router;
