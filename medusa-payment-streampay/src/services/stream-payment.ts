import {
    AbstractPaymentService,
    Cart,
    Data,
    Payment,
    PaymentSession,
    PaymentSessionStatus,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import * as solanajs from "@solana/web3.js"; // Import solana/web3.js correctly
import { StreamPayment } from "../models/stream-payment";
import { StreamPaymentRepository } from "../repositories/cart"; // Use proper import path

class StreamPaymentService extends AbstractPaymentService {
    private streamPaymentRepository: StreamPaymentRepository; // Use the correct type
    private daemonProviderUrl: string;
    private daemonProviderUser: string;
    private daemonProviderPassword: string;
    private merchantPaymentAddress: string;

    private daemon: any = null;
    private wallet: any = null;

    constructor(
        {
            streamPaymentRepository,
        },
        options
    ) {
        super(options);
        this.streamPaymentRepository = streamPaymentRepository;
        this.daemonProviderUrl = options.daemonProviderUrl;
        this.daemonProviderUser = options.daemonProviderUser;
        this.daemonProviderPassword = options.daemonProviderPassword;
        this.merchantPaymentAddress = options.merchantPaymentAddress;
    }

    private async connect() {
        if (this.daemon == null) {
            // Connect to the daemon correctly
            this.daemon = new solanajs.Connection(this.daemonProviderUrl, "singleGossip");

            // Create a wallet for Stream Payment
            this.wallet = solanajs.Keypair.generate(); // Use the correct key pair generation method
        }
    }

    async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
        await this.connect();

        const streamPayment = new StreamPayment();
        streamPayment.cart_id = paymentSession.cart_id;
        streamPayment.total_amount = paymentSession.cart.total || 0; // Provide a default value
        streamPayment.user_email = paymentSession.cart.email || ""; // Provide a default value
        streamPayment.virtual_wallet_addr = this.wallet.publicKey.toString(); // Use the publicKey property
        streamPayment.virtual_wallet_pkey = ""; // Provide a private spend key if needed
        streamPayment.virtual_wallet_vkey = ""; // Provide a private view key if needed
        await this.streamPaymentRepository.save(streamPayment);

        return {
            paymentAddress: streamPayment.virtual_wallet_addr,
        };
    }

    // Implement the rest of the methods as needed

    // ...
}

export default StreamPaymentService;
