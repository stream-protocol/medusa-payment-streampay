import streampayHooks from "./streampay";
import { Router } from "express";
import bodyParser from "body-parser";
import { wrapHandler } from "@medusajs/medusa";
import cors from "cors";

const route = Router();

export default (app) => {
  app.use("/streampay", route);

  route.options(
    "/hooks",
    cors({
      origin: /.*.streampayments.app\/apis/gm,
      methods: "POST,OPTIONS",
    })
  );
  route.post(
    "/hooks",
    // streampay constructEvent fails without body-parser
    bodyParser.json({ type: "application/json" }),
    wrapHandler(streampayHooks)
  );
  return app;
};