export const paymentConfig = {
  apiKey: 'YOUR_API_KEY', // Optional: Add StreamPay / Medusa API key here
  networks: {
    mainnet: {
      rpcUrl: 'https://api.mainnet.solana.com', // Mainnet RPC URL
      walletAddress: 'MAINNET_WALLET_ADDRESS', // Mainnet Wallet Address
    },
    testnet: {
      rpcUrl: 'https://api.testnet.com', // Testnet RPC URL
      walletAddress: 'TESTNET_WALLET_ADDRESS', // Testnet Wallet Address
    },
    custom: {
      rpcUrl: 'https://api.custom.com', // Custom RPC URL
      walletAddress: 'CUSTOM_WALLET_ADDRESS', // Custom Wallet Address
    },
    // Add more network configurations as needed
  },
};
