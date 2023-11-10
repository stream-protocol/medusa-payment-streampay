export const validateInput = (input: Record<string, unknown>) => {
  const requiredFields = ['field1', 'field2']; // Replace with actual required fields

  for (const field of requiredFields) {
    if (!input[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Add additional validation logic as needed
};
