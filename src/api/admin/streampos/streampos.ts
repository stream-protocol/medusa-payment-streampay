import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Handle GET requests for admin streampos
  res.json({
    message: "Admin StreamPOS GET request",
  });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // Handle POST requests for admin streampos
  res.json({
    message: "Admin StreamPOS POST request",
  });
}
