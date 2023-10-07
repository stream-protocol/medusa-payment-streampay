import https from "https";

import { SupportedCurrency } from "../utils/currencyCode";

const STREAMPAY_API_PATH = "https://api.streampayments.org";

type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";

type StreamPayResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

interface Request {
  path: string;
  method: HTTPMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  query?: Record<string, string>;
}

export interface StreamPayTransactionAuthorization {
  reference: string;
  authorization_url: string;
  access_code: string;
}

export default class StreamPay {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  protected async requestStreamPayAPI<T>(request: Request): Promise<T> {
    const path =
      request.path.replace(/\/$/, "") +
      "/?" +
      new URLSearchParams(request.query).toString();

    const options = {
      method: request.method,
      path,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(STREAMPAY_API_PATH, options, res => {
        let data: Uint8Array[] = [];

        res.on("data", chunk => {
          data.push(chunk);
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(data).toString()) as T);
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on("error", e => {
        reject(e);
      });

      if (request.body && Object.values(request.body).length > 0) {
        req.write(JSON.stringify(request.body));
      }

      req.end();
    });
  }

  transaction = {
    verify: ({ reference }: { reference: string }) =>
      this.requestStreamPayAPI<
        StreamPayResponse<{
          id: number;
          status: string;
          reference: string;
          amount: number;
          currency: string;
        }>
      >({
        path: "/transaction/verify/" + reference,
        method: "GET",
      }),
    get: ({ id }: { id: string }) =>
      this.requestStreamPayAPI<
        StreamPayResponse<{
          id: number;
          status: string;
          reference: string;
        }>
      >({
        path: "/transaction/" + id,
        method: "GET",
      }),
    initialize: ({
      amount,
      email,
      currency,
      reference,
    }: {
      amount: number;
      email?: string;
      currency?: SupportedCurrency;
      reference?: string;
    }) =>
      this.requestStreamPayAPI<
        StreamPayResponse<{
          authorization_url: string;
          access_code: string;
          reference: string;
        }>
      >({
        path: "/transaction/initialize",
        method: "POST",
        body: {
          amount,
          email,
          currency,
          reference,
        },
      }),
  };

  refund = {
    create: ({
      transaction,
      amount,
    }: {
      transaction: number;
      amount: number;
    }) =>
      this.requestStreamPayAPI<
        StreamPayResponse<{
          id: number;
          status: string;
          reference: string;
          amount: number;
        }>
      >({
        path: "/refund",
        method: "POST",
        body: {
          transaction,
          amount,
        },
      }),
  };
}