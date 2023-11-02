import express from 'express';
export { StreamPayProcessor } from "./streampay-processor";
import { SolanaConnector } from './utils/solana-connector';

const app = express();
const port = process.env.PORT || 3000;

const solanaNetwork = process.env.SOLANA_NETWORK || 'https://api.devnet.solana.com';
const solanaConnector = new SolanaConnector(solanaNetwork);

app.get('/', (req, res) => {
  res.send('Welcome to StreamPay!');
});

app.get('/balance/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const balance = await solanaConnector.getBalance(walletAddress);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
