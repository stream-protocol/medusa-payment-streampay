import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Handle GET requests for store streampos
  res.json({
    message: "Store StreamPOS GET request",
  });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // Handle POST requests for store streampos
  res.json({
    message: "Store StreamPOS POST request",
  });
}
