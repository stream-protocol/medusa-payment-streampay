// providers/index.ts

// Importing other providers
import PayPalProvider from './paypal';
import StripeProvider from './stripe';
import SquareProvider from './square';

// Importing StreamPay provider
import StreamPayProvider from './streampay';

// Exporting all providers for easy access
export {
    PayPalProvider,
    StripeProvider,
    SquareProvider,
    StreamPayProvider
};

// Default export (optional based on your architecture)
export default {
    PayPalProvider,
    StripeProvider,
    SquareProvider,
    StreamPayProvider
};
