export const StreamPayProviderServiceMock = {
    transaction: {
      verify: jest.fn().mockImplementation(({ reference }) => {
        switch (reference) {
          case "123-failed":
            return Promise.resolve({
              data: {
                status: "failed",
                id: "123",
              },
            });
          case "123-passed":
            return Promise.resolve({
              data: {
                status: "success",
                id: "123",
                amount: 50,
                currency: "USDC",
              },
            });
          case "123-false":
            return Promise.resolve({
              status: false,
              data: {
                status: "failed",
                id: "123",
              },
            });
          case "123-throw":
            return Promise.reject(new Error("StreamPay error"));
          default:
            return Promise.resolve({
              data: {
                status: "pending",
                id: "123",
              },
            });
        }
      }),
  
      initialize: jest.fn().mockImplementation(({ amount, email }) => {
        return Promise.resolve({
          data: {
            reference: "ref-" + Math.random() * 50,
            authorization_url: "https://streampayments.app/123",
          },
        });
      }),
  
      get: jest.fn().mockImplementation(({ id }) => {
        switch (id) {
          case "123-success":
            return Promise.resolve({
              data: {
                status: "success",
                streampayTxId: id,
                streampayTxData: {},
              },
            });
  
          case "123-false":
            return Promise.resolve({
              status: false,
              data: {
                status: "failed",
                streampayTxId: id,
                streampayTxData: {},
              },
            });
  
          default:
            return Promise.resolve({
              data: {
                status: "failed",
                streampayTxId: id,
                streampayTxData: {},
              },
            });
        }
      }),
    },
  
    refund: {
      create: jest.fn().mockImplementation(({ transaction, amount }) =>
        Promise.resolve({
          transaction,
          amount,
          streampayTxData: {},
        }),
      ),
    },
  };
  
  export default jest.fn(() => StreamPayProviderServiceMock);