import {
  AbstractPaymentService,
  Cart,
  Data,
  Payment,
  PaymentSession,
  PaymentSessionStatus,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { StreamPay } from "../models/streampay";
import { StreamPayRepository } from "../repositories/streampay";
import { PublicKey, Transaction, SystemProgram, Connection } from "@solana/web3.js";
import axios from "axios"; // Import Axios for API requests

class StreamPayProviderService extends AbstractPaymentService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;

  private streamPaymentsRepository: StreamPayRepository; // Updated variable name

  // Stream Token-specific configuration
  private streamProviderUrl: string; // Updated variable name
  private streamProviderUser: string; // Updated variable name
  private streamProviderPassword: string; // Updated variable name

  private streamNetworkType: string; // Updated variable name
  private streamMerchantAddress: string; // Updated variable name

  // USDC-specific configuration
  private usdcWalletAddress: string; // Updated variable name

  // Wallet addresses
  private transactionFeeWalletAddress: string;
  private donationSolTokenWalletAddress: string;
  private merchantWalletAddress: string;

  private daemon: any = null;
  private wallet: any = null;

  // Stream Token (STRM) program address
  private streamProgramAddress: PublicKey = new PublicKey("5P3giWpPBrVKL8QP8roKM7NsLdi3ie1Nc2b5r9mGtvwb");

  constructor(
    {
      streamPaymentsRepository, // Updated variable name
    },
    options
  ) {
    super(options);

    this.streamPaymentsRepository = streamPaymentsRepository; // Updated variable assignment
    this.streamProviderUrl = options.streamProviderUrl; // Updated variable assignment
    this.streamProviderUser = options.streamProviderUser; // Updated variable assignment
    this.streamProviderPassword = options.streamProviderPassword; // Updated variable assignment
    this.streamNetworkType = options.streamNetworkType || "mainnet"; // Updated variable assignment
    this.streamMerchantAddress = options.streamMerchantAddress; // Updated variable assignment
    this.usdcWalletAddress = options.usdcWalletAddress; // Updated variable assignment

    // Set wallet addresses
    this.transactionFeeWalletAddress = "GiDtdoL6JV51qFJR4z3irpZDeRQ9kefAhBCqqS1REg9s";
    this.donationSolTokenWalletAddress = "Donation_SOL_Token_Wallet_Address"; // Replace with the actual address
    this.merchantWalletAddress = "GiDtdoL6JV51qFJR4z3irpZDeRQ9kefAhBCqqS1REg9s";

    // Initialize Stream Token-specific configurations
    this.initStreamProvider(); // Updated method name
  }

  // Rest of the code remains the same
}

export default StreamPayProviderService;
