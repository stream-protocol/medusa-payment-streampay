export interface StreamPaymentRequest {
    amount: number;
    currency: string;
    // ... other fields
}

export interface StreamPaymentResponse {
    transactionId: string;
    status: 'pending' | 'completed' | 'failed';
    // ... other fields
}

// ... other types and interfaces
