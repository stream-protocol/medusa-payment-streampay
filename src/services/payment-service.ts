import { StreamPaymentProvider } from '../providers/stream-payment/stream-payment';
import { Logger } from '../utils/logger';

class PaymentService {
    private paymentProvider: StreamPaymentProvider;
    private logger: Logger;

    constructor() {
        this.paymentProvider = new StreamPaymentProvider();
        this.logger = new Logger('PaymentService');
    }

    async createPayment(data) {
        try {
            const paymentSession = await this.paymentProvider.createPaymentSession(data);
            return paymentSession;
        } catch (error) {
            this.logger.error('Failed to create payment session:', error);
            throw new Error('Payment creation failed');
        }
    }

    async authorizePayment(sessionData) {
        try {
            const authorizedPayment = await this.paymentProvider.authorizePayment(sessionData);
            return authorizedPayment;
        } catch (error) {
            this.logger.error('Failed to authorize payment:', error);
            throw new Error('Payment authorization failed');
        }
    }

    async capturePayment(paymentId) {
        try {
            const capturedPayment = await this.paymentProvider.capturePayment(paymentId);
            return capturedPayment;
        } catch (error) {
            this.logger.error('Failed to capture payment:', error);
            throw new Error('Payment capture failed');
        }
    }

    async refundPayment(paymentId, amount) {
        try {
            const refundedPayment = await this.paymentProvider.refundPayment(paymentId, amount);
            return refundedPayment;
        } catch (error) {
            this.logger.error('Failed to refund payment:', error);
            throw new Error('Payment refund failed');
        }
    }

    // ... other methods related to payment operations
}

export default PaymentService;
