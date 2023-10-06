import { formatCurrency, validatePaymentRequest } from "../utils";

describe("Utils", () => {
    describe("formatCurrency", () => {
        it("should format currency correctly", () => {
            const result = formatCurrency(1000, "USD");
            expect(result).toBe("$10.00"); // Assuming formatCurrency converts cents to dollars for USD
        });

        // ... other test cases for formatCurrency
    });

    describe("validatePaymentRequest", () => {
        it("should validate a correct payment request", () => {
            const mockRequest = {
                amount: 1000,
                currency: "USD",
                // ... other fields
            };
            const validationResult = validatePaymentRequest(mockRequest);
            expect(validationResult.isValid).toBe(true);
        });

        it("should invalidate an incorrect payment request", () => {
            const mockRequest = {
                amount: "invalid_amount",
                currency: "USD",
            };
            const validationResult = validatePaymentRequest(mockRequest);
            expect(validationResult.isValid).toBe(false);
            expect(validationResult.errors).toContain("Invalid amount");
        });

        // ... other test cases for validatePaymentRequest
    });
});
