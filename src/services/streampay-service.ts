import { StreamPayProvider } from '../providers/streampay/streampay';
import { Logger } from '../utils/logger';
import { PaymentSessionData } from '../types'; // Assuming you have a types file

/**
 * PaymentService: A service layer that abstracts payment operations.
 */
class PaymentService {
    private paymentProvider: StreamPayProvider;
    private logger: Logger;

    /**
     * Constructor to initialize the PaymentService.
     * @param provider Optional payment provider. Defaults to StreamPayProvider.
     */
    constructor(provider?: StreamPayProvider) {
        this.paymentProvider = provider || new StreamPayProvider();
        this.logger = new Logger('PaymentService');
    }

    /**
     * Creates a payment session.
     * @param data Payment data.
     */
    async createPayment(data: any): Promise<PaymentSessionData> {
        try {
            const paymentSession = await this.paymentProvider.createPaymentSession(data);
            return paymentSession;
        } catch (error) {
            this.logger.error(`Failed to create payment session: ${error.message}`, error);
            throw new Error('Payment creation failed');
        }
    }

    // ... (similar improvements for other methods)

    /**
     * Refunds a payment.
     * @param paymentId The ID of the payment to refund.
     * @param amount The amount to refund.
     */
    async refundPayment(paymentId: string, amount: number): Promise<PaymentSessionData> {
        try {
            const refundedPayment = await this.paymentProvider.refundPayment(paymentId, amount);
            return refundedPayment;
        } catch (error) {
            this.logger.error(`Failed to refund payment: ${error.message}`, error);
            throw new Error('Payment refund failed');
        }
    }

    // ... other methods related to Stream Payment operations
}

export default PaymentService;
