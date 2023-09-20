import streampayHooks from "./streampay";
import { Router } from "express";
import bodyParser from "body-parser";
import { wrapHandler } from "@medusajs/medusa";
import cors from "cors";

const route = Router();

export default (app) => {
  // Mount the Streampay webhook route under "/streampay"
  app.use("/streampay", route);

  // Configure CORS options for the webhook route
  route.options(
    "/hooks",
    cors({
      origin: /.*.streampayments.app\/apis/gm,
      methods: "POST,OPTIONS",
    })
  );

  // Define a POST route for handling Streampay webhook events
  route.post(
    "/hooks",
    // Add body-parser middleware to parse JSON requests
    bodyParser.json({ type: "application/json" }),
    // Wrap the streampayHooks handler with Medusa's wrapHandler
    wrapHandler(streampayHooks)
  );

  return app;
};
