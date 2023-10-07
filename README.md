## Medusa Payment Plugin: StreamPay with Solana Integration

### Overview

This plugin integrates StreamPay with Solana blockchain capabilities as a payment method for Medusa. It allows merchants to accept payments using StreamPay while leveraging the speed, security, and scalability of the Solana blockchain.

The Medusa StreamPay plugin offers a seamless integration of StreamPay with the benefits of the Solana blockchain. Ensure to test the payment flow in a staging environment before deploying to production. This integration provides a modern, fast, and secure payment method suitable for the evolving e-commerce landscape.

### Features:

- **StreamPay Integration**: Seamlessly process payments using StreamPay's platform.
- **Solana Blockchain**: Utilize the high-speed, low-cost, and secure Solana blockchain for transactions.
- **Fast Transactions**: Benefit from Solana's quick transaction confirmations.
- **Low Fees**: Take advantage of Solana's efficiency which translates to lower transaction costs.
- **Scalability**: Handle a high volume of transactions simultaneously.
- **Security**: Enhanced security with Solana's unique proof-of-history and proof-of-stake consensus mechanisms.
- **Private Key Management**: Secure methods to handle and rotate private keys, ensuring utmost security.

### Prequisites

- **Medusa Backend**: Ensure you have a running instance of the Medusa backend.
- **StreamPayments Account**: Sign up for an account or log in to your existing StreamPayments™ dashboard.
- **Solana Account/Wallet Address**: Create a Solana account and have your wallet address ready. Consider using wallets like Phantom, MetaMask or TrustWallet for enhanced security and ease of use.

### Installation

1. Clone the StreamPay plugin repository or install it via npm/yarn:

```bash
npm install medusa-payment-streampay
```

2. Add the plugin to your Medusa setup:

```javascript
import { StreamPayProcessor } from "medusa-payment-streampay";

Medusa.plugins.register({
  name: "streampay",
  resolve: StreamPayProcessor,
});
```

### Configuration

To configure the StreamPay plugin, you need to provide:

- `secret_key`: Your StreamPay Secret Key. Obtainable from the StreamPayments dashboard.
- `solana_network`: The Solana network you want to use (`devnet`, `testnet`, or `mainnet-beta`).
- `debug`: (Optional) If set to `true`, the plugin will log debug information.

Example:

```javascript
Medusa.plugins.configure("streampay", {
  secret_key: "YOUR_STREAMPAY_SECRET_KEY",
  solana_network: "mainnet",
  debug: true,
});
```

### Usage

Once installed and configured, the StreamPay payment method will be available during checkout. The plugin handles:

- Initiating the payment with StreamPay and creating a Solana transaction.
- Updating payment data on cart changes.
- Authorizing the payment on cart completion using Solana's fast transaction confirmation.
- And more...

### Methods

In addition to the methods provided by the basic StreamPay plugin, the Solana integration offers:

- `createSolanaTransaction`: Initiates a Solana transaction when StreamPay is selected.
- `confirmSolanaTransaction`: Confirms the Solana transaction once the payment is authorized.
- `checkSolanaBalance`: Checks the balance of a given Solana address.

### Error Handling

The plugin provides comprehensive error handling for both StreamPay and Solana-related issues. Descriptive error messages assist in troubleshooting.

### Security & Private Key Management

- **Never hardcode or expose private keys**. Use secure vaults or key management services.
- Implement mechanisms to rotate keys if necessary.
- Ensure Solana transactions are signed securely, possibly using frontend wallets like Phantom or TrustWallet.
