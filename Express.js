// Example in Medusa server (Node.js)

const express = require('express');
const router = express.Router();
const streamPaymentGateway = new StreamPaymentGateway();

router.post('/create-transaction', async (req, res) => {
  try {
    const { senderKey, receiverKey, amount } = req.body;
    const transactionId = await streamPaymentGateway.createAndSendTransaction(senderKey, receiverKey, amount);
    res.json({ transactionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... other routes for connecting/disconnecting wallet, etc.

module.exports = router;
