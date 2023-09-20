import { Request, Response } from "express";
import { constructWebhook, handlePaymentHook } from "../utils/utils";
import { PaymentResponse, StreamPayEvent, StreamPayS2SResponse } from "../../types";
import { Logger } from "@medusajs/medusa";

export default async (req: Request, res: Response) => {
  let event: StreamPayEvent;
  const logger = req.scope.resolve("logger") as Logger;
  try {
    // Construct the StreamPayEvent from the incoming request
    event = constructWebhook({
      signature: req.headers["x-verify"] as string,
      encodedBody: req.body,
      container: req.scope,
    });
  } catch (err) {
    logger.info(
      `${JSON.stringify(req.body)} ${err.message} header:${JSON.stringify(
        req.headers
      )}`
    );
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Extract payment intent data from the event
  const paymentIntent = event.data.object as unknown as StreamPayS2SResponse;

  // Handle the payment hook event
  const { statusCode } = await handlePaymentHook({
    event,
    container: req.scope,
    paymentIntent,
  });

  logger.info(`payment status code: ${statusCode}`);
  res.sendStatus(statusCode);
};
