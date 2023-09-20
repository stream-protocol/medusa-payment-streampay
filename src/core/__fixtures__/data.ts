import {
  EXISTING_CUSTOMER_EMAIL,
  FAIL_INTENT_ID,
  PARTIALLY_FAIL_INTENT_ID,
  STREAMPAY_ID,
  WRONG_CUSTOMER_EMAIL,
} from "../../__mocks__/streampay";
import { PaymentIntentDataByStatus } from "../../__fixtures__/data";
import { Customer, PaymentProcessorContext } from "@medusajs/medusa";
import { PaymentStatusCodeValues, StreamPayS2SResponse } from "../../types";

// INITIATE PAYMENT DATA

export const initiatePaymentContextWithExistingCustomer: PaymentProcessorContext =
  {
    email: EXISTING_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: { phone: "1234567", id: "thisIsATestUser" } as any,
    context: {},
    paymentSessionData: {
      readyToPay: true,
      merchantTransactionId: "test" + Math.round(Math.random() * 1e10),
      redirectUrl: `https://localhost:8000/order/${
        "test" + Math.round(Math.random() * 1e10)
      }`,
    },
  };

export const initiatePaymentContextWithExistingCustomerStreamPayId = {
  email: EXISTING_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 1000,
  resource_id: "test",
  customer: {
    metadata: {
      streampay_id: "test",
    },
  },
  context: {},
  paymentSessionData: {},
};

export const initiatePaymentContextWithWrongEmail = {
  email: WRONG_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 1000,
  resource_id: "test",
  customer: {},
  context: {},
  paymentSessionData: {},
};

export const initiatePaymentContextWithFailIntentCreation = {
  email: EXISTING_CUSTOMER_EMAIL,
  currency_code: "usdc",
  amount: 1000,
  resource_id: "test",
  customer: {},
  context: {
    payment_description: "fail",
  },
  paymentSessionData: {},
};

// AUTHORIZE PAYMENT DATA

export const authorizePaymentSuccessData = {
  id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
};

// CANCEL PAYMENT DATA

export const cancelPaymentSuccessData = {
  id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
};

export const cancelPaymentFailData = {
  id: FAIL_INTENT_ID,
};

export const cancelPaymentPartiallyFailData = {
  id: PARTIALLY_FAIL_INTENT_ID,
};

// CAPTURE PAYMENT DATA

export const capturePaymentContextSuccessData = {
  paymentSessionData: {
    id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
  },
};

export const capturePaymentContextFailData = {
  paymentSessionData: {
    id: FAIL_INTENT_ID,
  },
};

export const capturePaymentContextPartiallyFailData = {
  paymentSessionData: {
    id: PARTIALLY_FAIL_INTENT_ID,
  },
};

// DELETE PAYMENT DATA

export const deletePaymentSuccessData = {
  id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
};

export const deletePaymentFailData = {
  id: FAIL_INTENT_ID,
};

export const deletePaymentPartiallyFailData = {
  id: PARTIALLY_FAIL_INTENT_ID,
};

// REFUND PAYMENT DATA

export const refundPaymentSuccessData = {
  id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
};

export const refundPaymentFailData = {
  id: FAIL_INTENT_ID,
};

// RETRIEVE PAYMENT DATA

export const retrievePaymentSuccessData = {
  id: PaymentIntentDataByStatus.PAYMENT_SUCCESS.id,
};

export const retrievePaymentFailData = {
  id: FAIL_INTENT_ID,
};

// UPDATE PAYMENT DATA

export const updatePaymentContextWithExistingCustomer = {
  email: EXISTING_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 1000,
  resource_id: "test",
  customer: {},
  context: {},
  paymentSessionData: {
    readyToPay: true,
    customer: "test",
    amount: 1000,
  },
};

export const updatePaymentContextWithExistingCustomerStreamPayId = {
  email: EXISTING_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 1000,
  resource_id: "test",
  customer: {
    metadata: {
      streampay_id: "test",
    },
  },
  context: {},
  paymentSessionData: {
    readyToPay: true,
    customer: "test",
    amount: 1000,
  },
};

export const updatePaymentContextWithWrongEmail = {
  email: WRONG_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 1000,
  resource_id: "test",
  customer: {},
  context: {},
  paymentSessionData: {
    readyToPay: true,
    customer: "test",
    amount: 1000,
  },
};

export const updatePaymentContextWithDifferentAmount = {
  email: EXISTING_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 300,
  resource_id: "test",
  customer: { phone: "1234567", id: "thisIsATestUser" } as any,
  context: {},
  paymentSessionData: {
    readyToPay: true,
    merchantTransactionId: "test" + Math.round(Math.random() * 1e10),
    redirectUrl: `https://localhost:8000/order/${
      "test" + Math.round(Math.random() * 1e10)
    }`,
  },
};

export const updatePaymentContextFailWithDifferentAmount = {
  email: WRONG_CUSTOMER_EMAIL,
  currency_code: "usd",
  amount: 500,
  resource_id: "test",
  customer: {
    metadata: {
      streampay_id: "test",
    },
  },
  context: {
    metadata: {
      streampay_id: "test",
    },
  },
  paymentSessionData: {
    id: FAIL_INTENT_ID,
    customer: "test",
    amount: 1000,
  },
};

export const updatePaymentDataWithAmountData = {
  sessionId: STREAMPAY_ID,
  amount: 500,
};

export const updatePaymentDataWithoutAmountData = {
  sessionId: STREAMPAY_ID,
  customProp: "test",
};

export const UPIPaymentRequest = {
  merchantId: "MERCHANTUAT",
  merchantTransactionId: "MTI785059006818810",
  merchantUserId: "MUI93303730222937",
  amount: 10000,
  callbackUrl: "https://webhook.site/callback-url",
  mobileNumber: "1234567",
  deviceContext: {
    deviceOS: "IOS",
    merchantCallBackScheme: "iOSIntentIntegration",
  },
  paymentInstrument: {
    type: "UPI_INTENT",
    targetApp: "STREAMPAY",
    accountConstraints: [
      {
        // Optional. Required only for TPV Flow.
        accountNumber: "420200001892",
        ifsc: "ICIC0000041",
      },
    ],
  },
};

export const SamplePayloadBase64StdCheckout = {
  merchantId: "MERCHANTUAT",
  merchantTransactionId: "MTI785059006818810",
  merchantUserId: "MUID123",
  amount: 10000,
  redirectUrl: "https://webhook.site/redirect-url",
  redirectMode: "POST",
  callbackUrl: "https://webhook.site/callback-url",
  mobileNumber: "123456",
  paymentInstrument: {
    type: "PAY_PAGE",
  },
};
export const responseHookData: StreamPayS2SResponse = {
  success: true,
  code: PaymentStatusCodeValues.PAYMENT_SUCCESS,
  message: "Your request has been successfully completed.",
  data: {
    merchantId: "FKRT",
    merchantTransactionId: "MTI785059006818810",
    transactionId: "T2111221437456190170379",
    amount: 100,
    state: "COMPLETED",
    responseCode: "SUCCESS",
    paymentInstrument: {
      type: "UPI",
      utr: "206378866112",
    },
  },
};