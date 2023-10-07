import { formatCurrency, validatePaymentRequest } from "../utils";

describe("Utils", () => {
    describe("formatCurrency", () => {
        it("should format cryptocurrency correctly", () => {
            const result = formatCurrency(50, "USDC");
            expect(result).toBe("$10.00"); // Assuming formatCurrency converts cents to dollars for USD
        });

        // ... other test cases for formatCurrency
    });

    describe("validatePaymentRequest", () => {
        it("should validate a correct payment request", () => {
            const mockRequest = {
                amount: 10,
                currency: "USDC",
                // ... other fields
            };
            const validationResult = validatePaymentRequest(mockRequest);
            expect(validationResult.isValid).toBe(true);
        });

        it("should invalidate an incorrect payment request", () => {
            const mockRequest = {
                amount: "invalid_amount",
                currency: "USDC",
            };
            const validationResult = validatePaymentRequest(mockRequest);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain("Invalid amount");
        });

        // ... other test cases for validatePaymentRequest
    });
});
