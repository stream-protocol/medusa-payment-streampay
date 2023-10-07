type PaymentRequest = {
    amount: number;
    currency: string;
    // ... other fields
};

export const formatCurrency = (amount: number, currency: string): string => {
    const formattedAmount = amount.toFixed(2);
    
    // Handle different currency symbols and placements
    switch (currency) {
        case 'USDC':
            return `$${formattedAmount}`;
        case 'EURC':
            return `€${formattedAmount}`;
        case 'SOL':
            return `€${formattedAmount}`; 
        case 'STRM':
            return `€${formattedAmount}`; 
        // ... handle other currencies
        default:
            return `${currency} ${formattedAmount}`;
    }
}

export const validatePaymentRequest = (request: PaymentRequest): boolean => {
    if (!request.amount || typeof request.amount !== 'number' || request.amount <= 0) {
        return false;
    }
    if (!request.currency || typeof request.currency !== 'string' || request.currency.trim() === '') {
        return false;
    }
    // ... other validations
    return true;
}

// ... other utility functions
