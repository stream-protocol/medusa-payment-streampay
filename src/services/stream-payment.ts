import {
    MedusaProvider,
    MedusaProviderContext,
    MedusaProviderError,
    PaymentSessionData,
    PaymentSessionStatus,
  } from "@medusajs/medusa";
  import { Connection, Transaction, SystemProgram } from "@solana/web3.js";
  import { Logger } from "./logger";
  
  class StreamPaymentProvider implements MedusaProvider {
    private connection: Connection;
    private logger: Logger;
  
    constructor(options: { network: string; feePercentage?: number }) {
      const rpcUrl = this.getRpcUrl(options.network || "mainnet");
      this.connection = new Connection(rpcUrl);
      this.logger = new Logger('StreamPaymentProvider');
    }
  
    private getRpcUrl(network: string): string {
      const urls = {
        mainnet: "https://api.mainnet-beta.solana.com",
        testnet: "https://api.testnet.solana.com",
        devnet: "https://api.devnet.solana.com",
      };
      return urls[network] || network;
    }
  
    async createPaymentSession(context: MedusaProviderContext): Promise<PaymentSessionData | MedusaProviderError> {
      try {
        // ... (existing logic)
        this.logger.info(`Payment session created for session ${sessionData.session_id}`);
        return sessionData;
      } catch (error) {
        this.logger.error("Failed to create payment session:", error);
        throw new MedusaProviderError("Failed to create payment session");
      }
    }
  
    async authorizePayment(sessionData: PaymentSessionData): Promise<PaymentSessionData | MedusaProviderError> {
      try {
        // ... (existing logic)
        this.logger.info(`Payment authorized for session ${sessionData.session_id}`);
        return sessionData;
      } catch (error) {
        this.logger.error("Payment authorization failed:", error);
        throw new MedusaProviderError("Payment authorization failed");
      }
    }
  
    async capturePayment(sessionData: PaymentSessionData): Promise<PaymentSessionData | MedusaProviderError> {
      try {
        // ... (existing logic)
        this.logger.info(`Payment captured for session ${sessionData.session_id}`);
        return sessionData;
      } catch (error) {
        this.logger.error("Payment capture failed:", error);
        throw new MedusaProviderError("Payment capture failed");
      }
    }
  
    async cancelPayment(sessionData: PaymentSessionData): Promise<PaymentSessionData | MedusaProviderError> {
      try {
        // ... (existing logic)
        this.logger.info(`Payment canceled for session ${sessionData.session_id}`);
        return sessionData;
      } catch (error) {
        this.logger.error("Payment cancellation failed:", error);
        throw new MedusaProviderError("Payment cancellation failed");
      }
    }
  
    // ... (other methods)
  }
  
  export default StreamPaymentProvider;
  