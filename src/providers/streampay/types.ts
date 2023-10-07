export interface StreamPayRequest {
    amount: number;
    currency: string;
    // ... other fields
}

export interface StreamPayResponse {
    transactionId: string;
    status: 'pending' | 'completed' | 'failed';
    // ... other fields
}

// ... other types and interfaces
