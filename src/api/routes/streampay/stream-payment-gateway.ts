// stream-payment-gateway.ts

import { PaymentProviderService } from "@medusajs/medusa";
import { Connection, Transaction, SystemProgram } from "@solana/web3.js";
import { z } from "zod";

export class StreamPaymentGateway extends PaymentProviderService {
    private connection: Connection;
    private feePercentage: number;

    constructor(options) {
        super();

        const network = options.network || "mainnet"; // default to mainnet
        this.feePercentage = options.feePercentage || 0.01; // default to 1%
        const rpcUrl = this.getRpcUrl(network);
        this.connection = new Connection(rpcUrl);

        // Check connection health
        if (!this.isConnectionHealthy()) {
            throw new Error("Solana RPC URL is not reachable");
        }
    }

    private getRpcUrl(network: string): string {
        switch (network) {
            case "mainnet":
                return "https://api.mainnet.solana.com";
            case "testnet":
                return "https://api.testnet.solana.com";
            case "devnet":
                return "https://api.devnet.solana.com";
            case "stream_network":
                return "https://api.streampayments.org";
            default:
                return network; // Assume it's a custom RPC URL
        }
    }

    async createPayment(data) {
        if (!data.amount || typeof data.amount !== "number") {
            throw new Error("Invalid payment amount");
        }

        const fee = data.amount * this.feePercentage;
        const totalAmount = data.amount + fee;

        // Placeholder for Solana transaction creation
        // TODO: Implement the logic to create a transaction on Solana blockchain

        return {
            status: "pending",
            amount: totalAmount,
            fee: fee,
        };
    }

    // New method to check the health of the Solana connection
    private isConnectionHealthy(): boolean {
        try {
            // TODO: Implement a method to check the health of the Solana connection
            // For now, we'll assume it's always healthy
            return true;
        } catch (error) {
            console.error("Error checking Solana connection:", error);
            return false;
        }
    }
}

// Updated schema to include feePercentage and other potential options
export const StreamPaymentGatewayOptionsSchema = z.object({
    network: z.string().optional(),
    feePercentage: z.number().optional(),
    // TODO: Add other potential options as needed
});

export default StreamPaymentGateway;
