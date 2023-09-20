import { Request, Response } from 'express';
import { WalletService } from '../services'; // Import your wallet service

class WalletController {
  constructor(private walletService: WalletService) {}

  // Route to create a new wallet
  async createWallet(req: Request, res: Response) {
    try {
      const walletData = req.body;

      // Call the wallet service to create a new wallet
      const wallet = await this.walletService.createWallet(walletData);

      res.status(201).json(wallet);
    } catch (error) {
      console.error('Error creating wallet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Route to fetch wallet details
  async getWalletDetails(req: Request, res: Response) {
    try {
      const walletId = req.params.id;

      // Call the wallet service to get wallet details
      const wallet = await this.walletService.getWalletDetails(walletId);

      if (wallet) {
        res.status(200).json(wallet);
      } else {
        res.status(404).json({ error: 'Wallet not found' });
      }
    } catch (error) {
      console.error('Error fetching wallet details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Route to perform a wallet transaction
  async performTransaction(req: Request, res: Response) {
    try {
      const walletId = req.params.id;
      const transactionData = req.body;

      // Call the wallet service to perform a transaction
      const result = await this.walletService.performTransaction(walletId, transactionData);

      if (result.success) {
        res.status(200).json({ message: 'Transaction successful' });
      } else {
        res.status(400).json({ error: 'Transaction failed' });
      }
    } catch (error) {
      console.error('Error performing wallet transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default WalletController;
