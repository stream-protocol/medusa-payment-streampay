export const formatCurrency = (amount: number, currency: string): string => {
    // ... logic to format currency
    return `${currency} ${amount.toFixed(2)}`;
}

export const validatePaymentRequest = (request: any): boolean => {
    if (!request.amount || typeof request.amount !== 'number') {
        return false;
    }
    if (!request.currency || typeof request.currency !== 'string') {
        return false;
    }
    // ... other validations
    return true;
}

// ... other utility functions
