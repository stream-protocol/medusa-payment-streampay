const StreamPayConfig = {
    apiKey: 'YOUR_STREAMPAY_API_KEY',
    solanaProviderUrl: 'https://api.mainnet-beta.solana.com', // Adjust for your network
    strmProviderUrl: 'https://api.streampayments.app', // Replace with the actual StreamPay API URL
    strmProviderUser: 'YOUR_STREAMPAY_API_USER',
    strmProviderPassword: 'YOUR_STREAMPAY_API_PASSWORD',
    strmNetworkType: 'mainnet', // Mainnet, Testnet, or Custom
    strmMerchantAddress: 'YOUR_MERCHANT_STRM_ADDRESS',
    solWalletAddress: 'YOUR_SOL_WALLET_ADDRESS',
    merchantWalletAddress: 'YOUR_MERCHANT_WALLET_ADDRESS',
    charityWalletAddress: 'YOUR_CHARITY_WALLET_ADDRESS',
    transactionFeeWalletAddress: 'YOUR_TRANSACTION_FEE_WALLET_ADDRESS',
    taxRate: 24, // Example: 24% VAT
  };
  
  module.exports = StreamPayConfig;
  