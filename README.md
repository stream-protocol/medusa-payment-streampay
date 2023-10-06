# Project: StreamPay™ Payment Provider for Medusa Commerce

Stream**Pay**™ is a payment service integration for [Medusajs](https://docs.medusajs.com/), designed to handle cryptocurrency and stablecoin payments, such as SOL, USDC, USDT, EURC, Stream Token (STRM) and SPL tokens.

## What is Stream Payment Gateway?

Stream Payment Gateway is a robust and secure payment gateway, fortified by the Solana blockchain, designed to revolutionize the way businesses handle payments. It empowers businesses to offer their customers a seamless, secure, and lightning-fast payment experience, accepting not only cryptocurrencies but also stablecoins like USDC and EURC with unparalleled ease.

#### Key Features:

- **Secure Checkout Payments**: Our foremost priority is your payment security. Built on the Solana blockchain, **Stream**Payments™ solutions ensures that your transactions are fortified with advanced cryptographic algorithms, guaranteeing the utmost safety and integrity throughout the payment process.
- **Rapid Transaction Confirmation**: Harnessing the high-performance capabilities of the Solana blockchain, **Stream**Payments™  achieves near-instant transaction confirmations. This means reduced waiting times for your customers and a smoother, more efficient payment experience.
- **Cryptocurrency Compatibility**: **Stream**Payments™ opens the doors to a wide array of cryptocurrencies, giving businesses the flexibility to accept payments in various digital assets. From popular options like Solana, Bitcoin and Ethereum to a multitude of emerging SPL tokens, your customers have the freedom to choose their preferred payment method.
- **Stablecoin Support**: In addition to cryptocurrencies, Stream Payment Gateway seamlessly handles stablecoin payments, including USDT, USDC and EURC. This stable foundation offers reduced volatility and creates a secure, dependable environment for your transactions.
- **User-Friendly Interface**: **Stream**Payments™ merchant portal (Based of Medusa Admin UI) boasts an intuitive, user-friendly interface. It's designed for easy integration, allowing businesses to set up their payment systems effortlessly. Likewise, customers can make payments without hassle, enhancing their shopping experience.
- **Integration Flexibility**: Our platform offers versatile integration options, enabling businesses to seamlessly incorporate the checkout solution into their existing platforms, websites, or mobile applications. It's a hassle-free process that adapts to your unique requirements.
- **Real-Time Analytics**: Gain valuable insights into your payment transactions with **Stream**Payments™. Our real-time analytics feature empowers you to monitor sales, track transaction volumes, and analyze customer behavior, enabling data-driven decision-making for your business.
  
**Stream**Payments™ simplifies the intricate process of accepting cryptocurrency and stablecoin payments. It equips businesses with a secure and streamlined checkout experience while providing the scalability, speed, and security of the Solana blockchain. Whether you're a small online store or an enterprise-level operation, **Stream**Payments™ ensures that you can meet the diverse payment needs of your customers effortlessly.

## Table of Contents

- [StreamPay™ for Medusa](#streampay-for-medusa)
  - [Key Features of StreamPayments™:](#key-features-of-streampayments)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version >= 14)
- TypeScript installed (version >= 4)
- Solana Web3.js
- [Medusa](https://medusa-commerce.com/) backend set up and running.

### Installation

To install Stream Payment Gateway, follow these steps:

1. Clone this repository to your Medusa project directory:

   ```sh
   git clone https://github.com/stream-protocol/medusa-payment-streampay.git
   ```

2. Install dependencies:

   ```sh
   cd medusa-payment-streampay
   npm install
   ```

3. Build the project:

   ```sh
   npm run build
   ```

4. Start your Medusa server:

   ```sh
   npm start
   ```

## Configuration

Before using Stream**Pay**, you need to configure it. Update the configuration options in `config.ts` to match your requirements. Configuration options may include:

- `strmProviderUrl`: URL of the Stream Token provider.
- `strmProviderUser`: User for accessing the Stream Token provider.
- `strmProviderPassword`: Password for accessing the Stream Token provider.
- `strmNetworkType`: Network type (Mainnet, Testnet, or Custom).
- `strmMerchantAddress`: Merchant's Stream Token address.
- `solWalletAddress`: Merchant's SOL wallet address.
- Additional options for specific cryptocurrencies or stablecoins.

## Usage

To use Stream**Pay** in your Medusa project, follow these steps:

1. Import the Stream**Pay** service in your payment controller:

   ```typescript
   import StreamPayService from './services/stream-pay-service'; // Adjust the import path
   ```

2. Initialize and configure the service with your payment method:

   ```typescript
   const streamPayService = new StreamPayService({
     // Configuration options
   });
   ```

3. Implement the required payment methods in your controller. For example:

   ```typescript
   // Create a payment
   const createPayment = async (req, res) => {
     // Implement payment creation logic using StreamPay
   };

   // Capture a payment
   const capturePayment = async (req, res) => {
     // Implement payment capture logic using StreamPay
   };
   ```

4. Configure your Medusa payment gateway to use Stream**Pay**.

## Contributing

Contributions are welcome! Here's how you can contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
