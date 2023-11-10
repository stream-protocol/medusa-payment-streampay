export class Transaction {
  transactionId: string;
  amount: number;
  // Other properties that a transaction might have
  // ...

  constructor(transactionId: string, amount: number /*, other parameters */) {
    this.transactionId = transactionId;
    this.amount = amount;
    // Initialize other properties
    // ...
  }

  // Additional methods or properties as needed
}
