import {
  AbstractPaymentService,
  Cart,
  Data,
  Payment,
  PaymentSession,
  PaymentSessionStatus,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { StreamPay } from "../models/streampay"; // Updated import path
import { StreamPayRepository } from "../repositories/streampay"; // Updated import path
import { PublicKey, Transaction, SystemProgram, Connection } from "@solana/web3.js";
import axios from "axios"; // Import Axios for API requests

class StreamPayProviderService extends AbstractPaymentService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;

  private streamPayRepository: StreamPayRepository; // Updated variable name

  // Stream Token-specific configuration
  private strmProviderUrl: string;
  private strmProviderUser: string;
  private strmProviderPassword: string;

  private strmNetworkType: string; // Mainnet, Testnet, or Custom
  private strmMerchantAddress: string; // Merchant's Stream Token address

  // USDC-specific configuration
  private usdcWalletAddress: string; // Merchant's USDC wallet address

  // Wallet addresses
  private transactionFeeWalletAddress: string; // Transaction fee wallet address
  private donationSolTokenWalletAddress: string; // Donation SOL-token wallet address
  private merchantWalletAddress: string; // Merchant wallet address

  private daemon: any = null;
  private wallet: any = null;

  // Stream Token (STRM) program address
  private strmProgramAddress: PublicKey = new PublicKey("5P3giWpPBrVKL8QP8roKM7NsLdi3ie1Nc2b5r9mGtvwb");

  constructor(
    {
      streamPayRepository, // Updated variable name
    },
    options
  ) {
    super(options);

    this.streamPayRepository = streamPayRepository; // Updated variable assignment
    this.strmProviderUrl = options.strmProviderUrl;
    this.strmProviderUser = options.strmProviderUser;
    this.strmProviderPassword = options.strmProviderPassword;
    this.strmNetworkType = options.strmNetworkType || "mainnet"; // Default to Mainnet if not specified
    this.strmMerchantAddress = options.strmMerchantAddress;
    this.usdcWalletAddress = options.usdcWalletAddress;

    // Set wallet addresses
    this.transactionFeeWalletAddress = "GiDtdoL6JV51qFJR4z3irpZDeRQ9kefAhBCqqS1REg9s";
    this.donationSolTokenWalletAddress = "Donation_SOL_Token_Wallet_Address"; // Replace with the actual address
    this.merchantWalletAddress = "GiDtdoL6JV51qFJR4z3irpZDeRQ9kefAhBCqqS1REg9s";

    // Initialize Stream Token-specific configurations
    this.initStrmProvider();
  }

  private async initStrmProvider() {
    // Initialize the Stream Token provider based on network type
    this.daemon = await streampayjs.connectToDaemonRpc(
      this.strmProviderUrl,
      this.strmProviderUser,
      this.strmProviderPassword
    );

    // Create a wallet for Stream Token payments
    this.wallet = await streampayjs.createWalletKeys({
      networkType: this.strmNetworkType,
    });
  }

  async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
    // Fetch cryptocurrency price data from an external API (e.g., CoinGecko)
    const cryptoData = await this.fetchCryptoPriceData();

    // Generate a transaction ID (for illustration purposes)
    const transactionId = this.generateTransactionId();

    const paymentData: Data = {
      paymentMethod: paymentSession.payment_method,
      amount: paymentSession.cart.total || 0,
      usdcWalletAddress: this.usdcWalletAddress,
      transactionFeeWalletAddress: this.transactionFeeWalletAddress,
      donationSolTokenWalletAddress: this.donationSolTokenWalletAddress,
      merchantWalletAddress: this.merchantWalletAddress,
      cryptoData, // Add cryptocurrency price data to payment data
      transactionId, // Add the generated transaction ID to payment data
    };

    return paymentData;
  }

  async createPayment(cart: Cart): Promise<Data> {
    // Fetch cryptocurrency price data from an external API (e.g., CoinGecko)
    const cryptoData = await this.fetchCryptoPriceData();

    // Generate a transaction ID (for illustration purposes)
    const transactionId = this.generateTransactionId();

    const paymentData: Data = {
      paymentMethod: cart.payment_method,
      amount: cart.total || 0,
      usdcWalletAddress: this.usdcWalletAddress,
      transactionFeeWalletAddress: this.transactionFeeWalletAddress,
      donationSolTokenWalletAddress: this.donationSolTokenWalletAddress,
      merchantWalletAddress: this.merchantWalletAddress,
      cryptoData, // Add cryptocurrency price data to payment data
      transactionId, // Add the generated transaction ID to payment data
    };

    // Implement the logic to create a Stream Token (STRM) or USDC payment here

    return paymentData;
  }

  async capturePayment(payment: Payment): Promise<Data> {
    const capturedPayment: Data = {
      status: PaymentSessionStatus.CAPTURED,
    };

    // Implement the logic to capture a Stream Token (STRM) or USDC payment here

    return capturedPayment;
  }

  // Fetch cryptocurrency price data from an external API (CoinGecko in this example)
  private async fetchCryptoPriceData(): Promise<any> {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price", // Replace with the actual API endpoint
        {
          params: {
            ids: "solana,ethereum,bitcoin,euroc,stream-token,usdc,tether", // Add cryptocurrency or stablecoin IDs as needed
            vs_currencies: "usd", // Define the desired currency (e.g., USD)
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cryptocurrency price data:", error);
      return {};
    }
  }

  // Generate a transaction ID (for illustration purposes)
  private generateTransactionId(): string {
    return `TX-${Math.floor(Math.random() * 1000000)}`;
  }
}

export default StreamPayProviderService;