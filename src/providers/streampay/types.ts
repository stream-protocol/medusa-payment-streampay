export interface StreamPayRequest {
    amount: number;
    currency: 'USDC' | 'SOL' | 'STRM' | string; // Enumerate known currencies and allow for extensibility
    recipientAddress: string;
    referenceId?: string;
    memo?: string;
}

export interface StreamPayResponse {
    transactionId: string;
    solanaTransactionId: string;
    status: 'pending' | 'completed' | 'failed';
    amount: number;
    currency: string;
    merchantFee: number;
    solanaBlockchainFee: number;
    netAmount: number;
    timestamp: Date; // Use Date type for better clarity
}

export enum StreamPayErrorCode {
    INVALID_AMOUNT = 'INVALID_AMOUNT',
    INVALID_CURRENCY = 'INVALID_CURRENCY',
    TRANSACTION_FAILED = 'TRANSACTION_FAILED',
    // ... other error codes
}

export interface StreamPayError {
    code: StreamPayErrorCode;
    message: string;
}

export const calculateTotal = (originalAmount: number): { 
    totalAmount: number, 
    merchantFee: number, 
    solanaBlockchainFee: number, 
    netAmount: number 
} => {
    const MERCHANT_FEE_PERCENTAGE = 0.01;
    const SOLANA_BLOCKCHAIN_FEE = 0.000005;

    const merchantFee = originalAmount * MERCHANT_FEE_PERCENTAGE;
    const totalAmount = originalAmount;
    const netAmount = totalAmount - merchantFee - SOLANA_BLOCKCHAIN_FEE;

    return {
        totalAmount,
        merchantFee,
        solanaBlockchainFee: SOLANA_BLOCKCHAIN_FEE,
        netAmount
    };
}

// Example usage:
const paymentRequest: StreamPayRequest = {
    amount: 100,
    currency: 'USDC',
    recipientAddress: '5P3giWpPBrVKL8QP8roKM7NsLdi3ie1Nc2b5r9mGtvwb',
};

// ... other types and interfaces
