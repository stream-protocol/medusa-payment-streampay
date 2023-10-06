import { StreamPayClient } from "@streampayments/streampay";
import { formatCurrency, validatePaymentRequest } from "./utils";
import { StreamPaymentRequest, StreamPaymentResponse } from "./types";

class StreamPaymentProvider {
    private client: StreamPayClient;

    constructor(options: any) {
        this.client = new StreamPayClient(options);
    }

    async createPayment(request: StreamPaymentRequest): Promise<StreamPaymentResponse> {
        if (!validatePaymentRequest(request)) {
            throw new Error("Invalid payment request");
        }

        const formattedAmount = formatCurrency(request.amount, request.currency);
        // ... rest of the logic

        return {
            // ... response data
        };
    }

    // ... other methods
}

export default StreamPaymentProvider;
