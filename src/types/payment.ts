// Define a type for payment methods
export type PaymentMethod =
  | 'PayPal'
  | 'Apple Pay'
  | 'Google Pay'
  | 'StreamPay' 
  | 'Stripe'
  | 'Credit Card'
  | 'Bank Transfer';

// Define a type for cryptocurrencies
export type Cryptocurrency =
  | 'SOL'
  | 'STRM'
  | 'SPAY'
  | 'USDC'
  | 'EURC'
  | 'USDT'
  | 'BTC'
  | 'ETH'
  | 'LTC';

// Define a mapping of payment methods to their display names
export const PaymentMethodDisplay: Record<PaymentMethod, string> = {
  PayPal: 'PayPal',
  'Apple Pay': 'Apple Pay',
  'Google Pay': 'Google Pay',
  'StreamPay': 'StreamPay', 
  Stripe: 'Stripe',
  'Credit Card': 'Credit Card',
  'Bank Transfer': 'Bank Transfer',
};

// Define a mapping of cryptocurrencies to their display names
export const CryptocurrencyDisplay: Record<Cryptocurrency, string> = {
  SOL: 'Solana (SOL)',
  STRM: 'Stream (STRM)',
  SPAY: 'StreamPay (SPAY)',
  USDC: 'USD Coin (USDC)',
  EURC: 'Euro Coin (EURC)',
  USDT: 'Tether (USDT)',
  BTC: 'Bitcoin (BTC)',
  ETH: 'Ethereum (ETH)',
  LTC: 'Litecoin (LTC)',
};