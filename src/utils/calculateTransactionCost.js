const transactionFee = 0.00035; // Solana (SOL) transaction fee per USDC
const taxPercentage = 0.24; // 24% tax (VAT)
const merchantFee = 0.10; // 10% merchant fee
const streampayFee = 0.05; // 5% StreamPay fee
const transactionAmount = 10; // Transaction amount in USDC (SOL) example.

// Function to calculate transaction cost
function calculateTransactionCost(amount, isDonation) {
  // Calculate Transaction Fee Cost
  const transactionFeeCost = transactionFee * amount;

  // Calculate Tax Amount
  const taxAmount = taxPercentage * amount;

  // Calculate Merchant Fee Cost
  const merchantFeeCost = merchantFee * amount;

  // Calculate StreamPay Fee Cost
  const streampayFeeCost = streampayFee * amount;

  // Calculate Donation Cost if applicable
  const donationAmount = isDonation ? parseFloat(prompt("Enter Donation Amount USD in USDC:") || 1) : 0;

  // Calculate Total Cost
  const totalCost =
    amount + transactionFeeCost + taxAmount + merchantFeeCost + streampayFeeCost + donationAmount;

  // Display the results
  console.log(`Transaction Fee Cost: ${transactionFeeCost.toFixed(6)} USDC`);
  console.log(`Tax Amount: ${taxAmount.toFixed(6)} USDC`);
  console.log(`Merchant Fee Cost: ${merchantFeeCost.toFixed(6)} USDC`);
  console.log(`StreamPay Fee Cost: ${streampayFeeCost.toFixed(6)} USDC`);
  if (isDonation) {
    console.log(`Donation Amount: ${donationAmount.toFixed(6)} USDC`);
  }
  console.log(`Total Cost: ${totalCost.toFixed(6)} USDC`);
}

// Prompt the user for the type of transaction
const isDonation = prompt("Is this a donation? (yes/no)").toLowerCase() === "yes";

// Call the calculateTransactionCost function
calculateTransactionCost(transactionAmount, isDonation);
