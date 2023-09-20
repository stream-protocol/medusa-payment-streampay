import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useAdminProduct, useAdminCreateDraftOrder, useMedusa, useAdminPublishableApiKeys, useAdminCreatePublishableApiKey, useAdminCreateCollection, useAdminCreateProduct, useCreateCart, useAdminCustomQuery, useAdminCustomPost } from 'medusa-react';
import * as $3DjNB$react from 'react';
import $3DjNB$react__default, { useMemo, useEffect, createContext, createElement, useContext, useCallback, forwardRef, Children, isValidElement, cloneElement, Fragment as Fragment$1, useRef, useState, useLayoutEffect, useReducer } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CurrencyDollarSolid, ComputerDesktopSolid, ToolsSolid, CheckCircleSolid, CircleMiniSolid, SquaresPlusSolid, NextJs } from '@medusajs/icons';
import { Text, Heading, Badge, Button, CodeBlock, clx, Container } from '@medusajs/ui';
import { flushSync } from 'react-dom';

const OrderDetailDefault = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Text, { size: "small", className: "mb-6", children: "You finished the setup guide \u{1F389} You now have your first order. Feel free to play around with the order management functionalities, such as capturing payment, creating fulfillments, and more." }),
    /* @__PURE__ */ jsx(Heading, { level: "h2", className: "text-ui-fg-base pt-6 border-t border-ui-border-base border-solid mb-2", children: "Start developing with Medusa" }),
    /* @__PURE__ */ jsx(Text, { size: "small", children: "Medusa is a completely customizable commerce solution. We've curated some essential guides to kickstart your development with Medusa." }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mt-6 pb-6 mb-6 border-b border-ui-border-base border-solid auto-rows-fr", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://docs.medusajs.com/starters/nextjs-medusa-starter?path=simple-quickstart",
          target: "_blank",
          className: "flex",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 rounded-rounded flex items-start bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mr-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base rounded-lg border border-ui-border-strong p-1 flex justify-center items-center", children: /* @__PURE__ */ jsx(Badge, { type: "icon", children: /* @__PURE__ */ jsx(CurrencyDollarSolid, {}) }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xsmall", weight: "plus", className: "mb-1 text-ui-fg-base", children: "Start Selling in 3 Steps" }),
                  /* @__PURE__ */ jsx(Text, { size: "small", children: "Go live with a backend, an admin, and a storefront by following these three steps." })
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://docs.medusajs.com/recipes/?ref=onboarding",
          target: "_blank",
          className: "flex",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 rounded-rounded items-start flex bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mr-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base rounded-lg border border-ui-border-strong p-1 flex justify-center items-center", children: /* @__PURE__ */ jsx(Badge, { type: "icon", children: /* @__PURE__ */ jsx(ComputerDesktopSolid, {}) }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xsmall", weight: "plus", className: "mb-1 text-ui-fg-base", children: "Build Custom Use Cases" }),
                  /* @__PURE__ */ jsx(Text, { size: "small", children: "Learn how to build a marketplace, subscription-based purchases, or your custom use-case." })
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://docs.medusajs.com/beta/?ref=onboarding",
          target: "_blank",
          className: "flex",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 rounded-rounded items-start flex bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mr-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base rounded-lg border border-ui-border-strong p-1 flex justify-center items-center", children: /* @__PURE__ */ jsx(Badge, { type: "icon", children: /* @__PURE__ */ jsx(ToolsSolid, {}) }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xsmall", weight: "plus", className: "mb-1 text-ui-fg-base", children: "Check out beta features" }),
                  /* @__PURE__ */ jsx(Text, { size: "small", children: "Learn about hidden beta features and how to enable them in your store." })
                ] })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "You can find more useful guides in",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://docs.medusajs.com/?ref=onboarding",
          target: "_blank",
          className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover",
          children: "our documentation"
        }
      ),
      ". If you like Medusa, please",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/medusajs/medusa",
          target: "_blank",
          className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover",
          children: "star us on GitHub"
        }
      ),
      "."
    ] })
  ] });
};

async function prepareRegions(client) {
  let { regions } = await client.admin.regions.list();
  if (!regions.length) {
    let { store } = await client.admin.store.retrieve();
    if (!store.currencies) {
      store = (await client.admin.store.update({
        currencies: ["eur"]
      })).store;
    }
    regions = [(await client.admin.regions.create(getSampleRegion(store))).region];
  }
  return regions;
}
function getSampleRegion(store) {
  return {
    name: "EU",
    currency_code: store.currencies[0].code,
    tax_rate: 0,
    payment_providers: [
      "manual"
    ],
    fulfillment_providers: [
      "manual"
    ],
    countries: [
      "gb",
      "de",
      "dk",
      "se",
      "fr",
      "es",
      "it"
    ]
  };
}

async function prepareShippingOptions(client, region) {
  let { shipping_options } = await client.admin.shippingOptions.list();
  if (!shipping_options.length) {
    shipping_options = [(await client.admin.shippingOptions.create({
      "name": "PostFake Standard",
      "region_id": region.id,
      "provider_id": "manual",
      "data": {
        "id": "manual-fulfillment"
      },
      "price_type": "flat_rate",
      "amount": 1e3
    })).shipping_option];
  }
  return shipping_options;
}

const OrdersListDefault = ({ onNext, isComplete, data }) => {
  const { product } = useAdminProduct(data.product_id);
  const { mutateAsync: createDraftOrder, isLoading } = useAdminCreateDraftOrder();
  const { client } = useMedusa();
  const createOrder = async () => {
    var _a;
    const variant = (_a = product.variants[0]) != null ? _a : null;
    try {
      const regions = await prepareRegions(client);
      const shipping_options = await prepareShippingOptions(client, regions[0]);
      const { draft_order } = await createDraftOrder({
        email: "customer@medusajs.com",
        items: [
          variant ? {
            quantity: 1,
            variant_id: variant == null ? void 0 : variant.id
          } : {
            quantity: 1,
            title: product.title,
            unit_price: 50
          }
        ],
        shipping_methods: [
          {
            option_id: shipping_options[0].id
          }
        ],
        region_id: regions[0].id
      });
      const { order } = await client.admin.draftOrders.markPaid(draft_order.id);
      onNext(order);
    } catch (e) {
      console.error(e);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx(Text, { className: "mb-2", children: "The last step is to create a sample order using the product you just created. You can then view your order\u2019s details, process its payment, fulfillment, inventory, and more." }),
      /* @__PURE__ */ jsx(Text, { children: "By clicking the \u201CCreate a Sample Order\u201D button, we\u2019ll generate an order using the product you created and default configurations." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: !isComplete && /* @__PURE__ */ jsx(
      Button,
      {
        variant: "primary",
        size: "base",
        onClick: () => createOrder(),
        isLoading,
        children: "Create a sample order"
      }
    ) })
  ] });
};

const ProductDetailDefault = ({ onNext, isComplete, data }) => {
  const { publishable_api_keys: keys, isLoading, refetch } = useAdminPublishableApiKeys({
    offset: 0,
    limit: 1
  });
  const createPublishableApiKey = useAdminCreatePublishableApiKey();
  const api_key = useMemo(() => {
    var _a;
    return ((_a = keys == null ? void 0 : keys[0]) == null ? void 0 : _a.id) || "";
  }, [keys]);
  const backendUrl = process.env.MEDUSA_BACKEND_URL === "/" || process.env.MEDUSA_ADMIN_BACKEND_URL === "/" ? location.origin : process.env.MEDUSA_BACKEND_URL || process.env.MEDUSA_ADMIN_BACKEND_URL || "http://location:9000";
  useEffect(() => {
    if (!isLoading && !(keys == null ? void 0 : keys.length)) {
      createPublishableApiKey.mutate({
        "title": "Development"
      }, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  }, [isLoading, keys]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Text, { children: "On this page, you can view your product's details and edit them." }),
      /* @__PURE__ */ jsx(Text, { children: "You can preview your product using Medusa's Store APIs. You can copy any of the following code snippets to try it out." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: !isLoading && /* @__PURE__ */ jsxs(CodeBlock, { snippets: [
      {
        label: "cURL",
        language: "bash",
        code: `curl "${backendUrl}/store/products/${data == null ? void 0 : data.product_id}"${api_key ? ` -H "x-publishable-key: ${api_key}"` : ``}`
      },
      {
        label: "Medusa JS Client",
        language: "js",
        code: `// Install the JS Client in your storefront project: @medusajs/medusa-js

import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa(${api_key ? `{ publishableApiKey: "${api_key}"}` : ``})
const product = await medusa.products.retrieve("${data == null ? void 0 : data.product_id}")
console.log(product.id)`
      },
      {
        label: "Medusa React",
        language: "tsx",
        code: `// Install the React SDK and required dependencies in your storefront project:
// medusa-react @tanstack/react-query @medusajs/medusa

import { useProduct } from "medusa-react"

const { product } = useProduct("${data == null ? void 0 : data.product_id}")
console.log(product.id)`
      },
      {
        label: "@medusajs/product",
        language: "tsx",
        code: `// Install the Product module in a serverless project, such as a Next.js storefront: @medusajs/product

import {
initialize as initializeProductModule,
} from "@medusajs/product"

// in an async function, or you can use promises
async () => {
  // ...
  const productService = await initializeProductModule()
  const products = await productService.list({
    id: "${data == null ? void 0 : data.product_id}",
  })

  console.log(products[0])
}`
      }
    ], className: "my-6", children: [
      /* @__PURE__ */ jsx(CodeBlock.Header, {}),
      /* @__PURE__ */ jsx(CodeBlock.Body, {})
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `${backendUrl}/store/products/${data == null ? void 0 : data.product_id}`,
          target: "_blank",
          children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "base", children: "Open preview in browser" })
        }
      ),
      !isComplete && /* @__PURE__ */ jsx(Button, { variant: "primary", size: "base", onClick: () => onNext(), children: "Next step" })
    ] })
  ] });
};

function getSampleProducts({
  regions,
  collection_id
}) {
  return [
    {
      title: "Medusa T-Shirt",
      status: "published" /* PUBLISHED */,
      collection_id,
      discountable: true,
      subtitle: null,
      description: "Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.",
      handle: "medusa-t-shirt",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png"
      ],
      options: [
        {
          title: "Size"
        },
        {
          title: "Color"
        }
      ],
      variants: [
        {
          title: "S / Black",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "S"
            },
            {
              value: "Black"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "S / White",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "S"
            },
            {
              value: "White"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M / Black",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "M"
            },
            {
              value: "Black"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M / White",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "M"
            },
            {
              value: "White"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L / Black",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "L"
            },
            {
              value: "Black"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L / White",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "L"
            },
            {
              value: "White"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL / Black",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "XL"
            },
            {
              value: "Black"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL / White",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2200
            };
          }),
          options: [
            {
              value: "XL"
            },
            {
              value: "White"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    },
    {
      title: "Medusa Sweatshirt",
      status: "published" /* PUBLISHED */,
      discountable: true,
      collection_id,
      subtitle: null,
      description: "Reimagine the feeling of a classic sweatshirt. With our cotton sweatshirt, everyday essentials no longer have to be ordinary.",
      handle: "sweatshirt",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png"
      ],
      options: [
        {
          title: "Size"
        }
      ],
      variants: [
        {
          title: "S",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "S"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "M"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "L"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "XL"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    },
    {
      title: "Medusa Sweatpants",
      status: "published" /* PUBLISHED */,
      discountable: true,
      collection_id,
      subtitle: null,
      description: "Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.",
      handle: "sweatpants",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png"
      ],
      options: [
        {
          title: "Size"
        }
      ],
      variants: [
        {
          title: "S",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "S"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "M"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "L"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 3350
            };
          }),
          options: [
            {
              value: "XL"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    },
    {
      title: "Medusa Shorts",
      status: "published" /* PUBLISHED */,
      discountable: true,
      collection_id,
      subtitle: null,
      description: "Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.",
      handle: "shorts",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png"
      ],
      options: [
        {
          title: "Size"
        }
      ],
      variants: [
        {
          title: "S",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2850
            };
          }),
          options: [
            {
              value: "S"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2850
            };
          }),
          options: [
            {
              value: "M"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2850
            };
          }),
          options: [
            {
              value: "L"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 2850
            };
          }),
          options: [
            {
              value: "XL"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    },
    {
      title: "Medusa Hoodie",
      status: "published" /* PUBLISHED */,
      discountable: true,
      collection_id,
      subtitle: null,
      description: "Reimagine the feeling of a classic hoodie. With our cotton hoodie, everyday essentials no longer have to be ordinary.",
      handle: "hoodie",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_back.png"
      ],
      options: [
        {
          title: "Size"
        }
      ],
      variants: [
        {
          title: "S",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "S"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "M"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "L"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "XL"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    },
    {
      title: "Medusa Longsleeve",
      status: "published" /* PUBLISHED */,
      discountable: true,
      collection_id,
      subtitle: null,
      description: "Reimagine the feeling of a classic longsleeve. With our cotton longsleeve, everyday essentials no longer have to be ordinary.",
      handle: "longsleeve",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/ls-black-front.png",
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/ls-black-back.png"
      ],
      options: [
        {
          title: "Size"
        }
      ],
      variants: [
        {
          title: "S",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "S"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "M",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "M"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "L",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "L"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        },
        {
          title: "XL",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 4150
            };
          }),
          options: [
            {
              value: "XL"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    },
    {
      title: "Medusa Coffee Mug",
      status: "published" /* PUBLISHED */,
      discountable: true,
      collection_id,
      subtitle: null,
      description: "Every programmer's best friend.",
      handle: "coffee-mug",
      is_giftcard: false,
      weight: 400,
      images: [
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png"
      ],
      options: [
        {
          title: "Size"
        }
      ],
      variants: [
        {
          title: "One Size",
          prices: regions.map((region) => {
            return {
              currency_code: region.currency_code,
              amount: 1200
            };
          }),
          options: [
            {
              value: "One Size"
            }
          ],
          inventory_quantity: 100,
          manage_inventory: true
        }
      ]
    }
  ];
}

const ProductsListDefault = ({ onNext, isComplete }) => {
  const { mutateAsync: createCollection, isLoading: collectionLoading } = useAdminCreateCollection();
  const { mutateAsync: createProduct, isLoading: productLoading } = useAdminCreateProduct();
  const { client } = useMedusa();
  const isLoading = useMemo(
    () => collectionLoading || productLoading,
    [collectionLoading, productLoading]
  );
  const createSample = async () => {
    try {
      const { collection } = await createCollection({
        title: "Merch",
        handle: "merch"
      });
      const regions = await prepareRegions(client);
      const sampleProducts = getSampleProducts({
        regions,
        collection_id: collection.id
      });
      const { product } = await createProduct(sampleProducts[0]);
      onNext(product);
    } catch (e) {
      console.error(e);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Text, { className: "mb-2", children: "Create a product and set its general details such as title and description, its price, options, variants, images, and more. You'll then use the product to create a sample order." }),
    /* @__PURE__ */ jsx(Text, { children: `You can create a product by clicking the "New Product" button below. Alternatively, if you're not ready to create your own product, we can create a sample one for you.` }),
    !isComplete && /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-6", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "primary",
        size: "base",
        onClick: () => createSample(),
        isLoading,
        children: "Create sample product"
      }
    ) })
  ] });
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/* -------------------------------------------------------------------------------------------------
 * createContextScope
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    /* -----------------------------------------------------------------------------------------------
   * createContext
   * ---------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
        const BaseContext = /*#__PURE__*/ createContext(defaultContext);
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        function Provider(props) {
            const { scope: scope , children: children , ...context } = props;
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext; // Only re-memoize when prop values change
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const value = useMemo(()=>context
            , Object.values(context));
            return /*#__PURE__*/ createElement(Context.Provider, {
                value: value
            }, children);
        }
        function useContext$1(consumerName, scope) {
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext;
            const context = useContext(Context);
            if (context) return context;
            if (defaultContext !== undefined) return defaultContext; // if a defaultContext wasn't specified, it's a required context.
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        Provider.displayName = rootComponentName + 'Provider';
        return [
            Provider,
            useContext$1
        ];
    }
    /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/ const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return /*#__PURE__*/ createContext(defaultContext);
        });
        return function useScope(scope) {
            const contexts = (scope === null || scope === void 0 ? void 0 : scope[scopeName]) || scopeContexts;
            return useMemo(()=>({
                    [`__scope${scopeName}`]: {
                        ...scope,
                        [scopeName]: contexts
                    }
                })
            , [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        $c512c27ab02ef895$export$fd42f52fd3ae1109,
        $c512c27ab02ef895$var$composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
/* -------------------------------------------------------------------------------------------------
 * composeContextScopes
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope1 = ()=>{
        const scopeHooks = scopes.map((createScope)=>({
                useScope: createScope(),
                scopeName: createScope.scopeName
            })
        );
        return function useComposedScopes(overrideScopes) {
            const nextScopes1 = scopeHooks.reduce((nextScopes, { useScope: useScope , scopeName: scopeName  })=>{
                // We are calling a hook inside a callback which React warns against to avoid inconsistent
                // renders, however, scoping doesn't have render side effects so we ignore the rule.
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes,
                    ...currentScope
                };
            }, {});
            return useMemo(()=>({
                    [`__scope${baseScope.scopeName}`]: nextScopes1
                })
            , [
                nextScopes1
            ]);
        };
    };
    createScope1.scopeName = baseScope.scopeName;
    return createScope1;
}

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$var$setRef(ref, value) {
    if (typeof ref === 'function') ref(value);
    else if (ref !== null && ref !== undefined) ref.current = value;
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
    return (node)=>refs.forEach((ref)=>$6ed0406888f73fc4$var$setRef(ref, node)
        )
    ;
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback($6ed0406888f73fc4$export$43e446d32b3d21af(...refs), refs);
}

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$8c6ed5c666ac1360 = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
    if (slottable) {
        // the new element to render is the one passed as a child of `Slottable`
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child)=>{
            if (child === slottable) {
                // because the new element will be the one rendered, we are only interested
                // in grabbing its children (`newElement.props.children`)
                if (Children.count(newElement) > 1) return Children.only(null);
                return /*#__PURE__*/ isValidElement(newElement) ? newElement.props.children : null;
            } else return child;
        });
        return /*#__PURE__*/ createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
            ref: forwardedRef
        }), /*#__PURE__*/ isValidElement(newElement) ? /*#__PURE__*/ cloneElement(newElement, undefined, newChildren) : null);
    }
    return /*#__PURE__*/ createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
        ref: forwardedRef
    }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = 'Slot';
/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$var$SlotClone = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    if (/*#__PURE__*/ isValidElement(children)) return /*#__PURE__*/ cloneElement(children, {
        ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
        ref: forwardedRef ? $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref) : children.ref
    });
    return Children.count(children) > 1 ? Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = 'SlotClone';
/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children: children  })=>{
    return /*#__PURE__*/ createElement(Fragment$1, null, children);
};
/* ---------------------------------------------------------------------------------------------- */ function $5e63c961fc1ce211$var$isSlottable(child) {
    return /*#__PURE__*/ isValidElement(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
    // all child props should override
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) overrideProps[propName] = (...args)=>{
                childPropValue(...args);
                slotPropValue(...args);
            };
            else if (slotPropValue) overrideProps[propName] = slotPropValue;
        } else if (propName === 'style') overrideProps[propName] = {
            ...slotPropValue,
            ...childPropValue
        };
        else if (propName === 'className') overrideProps[propName] = [
            slotPropValue,
            childPropValue
        ].filter(Boolean).join(' ');
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}

// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(name) {
    /* -----------------------------------------------------------------------------------------------
   * CollectionProvider
   * ---------------------------------------------------------------------------------------------*/ const PROVIDER_NAME = name + 'CollectionProvider';
    const [createCollectionContext, createCollectionScope] = $c512c27ab02ef895$export$50c7b4e9d9f19c1(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
        collectionRef: {
            current: null
        },
        itemMap: new Map()
    });
    const CollectionProvider = (props)=>{
        const { scope: scope , children: children  } = props;
        const ref = $3DjNB$react__default.useRef(null);
        const itemMap = $3DjNB$react__default.useRef(new Map()).current;
        return /*#__PURE__*/ $3DjNB$react__default.createElement(CollectionProviderImpl, {
            scope: scope,
            itemMap: itemMap,
            collectionRef: ref
        }, children);
    };
    /* -----------------------------------------------------------------------------------------------
   * CollectionSlot
   * ---------------------------------------------------------------------------------------------*/ const COLLECTION_SLOT_NAME = name + 'CollectionSlot';
    const CollectionSlot = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
        const { scope: scope , children: children  } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, context.collectionRef);
        return /*#__PURE__*/ $3DjNB$react__default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
            ref: composedRefs
        }, children);
    });
    /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * ---------------------------------------------------------------------------------------------*/ const ITEM_SLOT_NAME = name + 'CollectionItemSlot';
    const ITEM_DATA_ATTR = 'data-radix-collection-item';
    const CollectionItemSlot = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
        const { scope: scope , children: children , ...itemData } = props;
        const ref = $3DjNB$react__default.useRef(null);
        const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        $3DjNB$react__default.useEffect(()=>{
            context.itemMap.set(ref, {
                ref: ref,
                ...itemData
            });
            return ()=>void context.itemMap.delete(ref)
            ;
        });
        return /*#__PURE__*/ $3DjNB$react__default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
            [ITEM_DATA_ATTR]: '',
            ref: composedRefs
        }, children);
    });
    /* -----------------------------------------------------------------------------------------------
   * useCollection
   * ---------------------------------------------------------------------------------------------*/ function useCollection(scope) {
        const context = useCollectionContext(name + 'CollectionConsumer', scope);
        const getItems = $3DjNB$react__default.useCallback(()=>{
            const collectionNode = context.collectionRef.current;
            if (!collectionNode) return [];
            const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
            const items = Array.from(context.itemMap.values());
            const orderedItems = items.sort((a, b)=>orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
            );
            return orderedItems;
        }, [
            context.collectionRef,
            context.itemMap
        ]);
        return getItems;
    }
    return [
        {
            Provider: CollectionProvider,
            Slot: CollectionSlot,
            ItemSlot: CollectionItemSlot
        },
        useCollection,
        createCollectionScope
    ];
}

function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler, ourEventHandler, { checkForDefaultPrevented: checkForDefaultPrevented = true  } = {}) {
    return function handleEvent(event) {
        originalEventHandler === null || originalEventHandler === void 0 || originalEventHandler(event);
        if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
    };
}

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */ function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
    const callbackRef = useRef(callback);
    useEffect(()=>{
        callbackRef.current = callback;
    }); // https://github.com/facebook/react/issues/19240
    return useMemo(()=>(...args)=>{
            var _callbackRef$current;
            return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
        }
    , []);
}

function $71cd76cc60e0454e$export$6f32135080cb4c3({ prop: prop , defaultProp: defaultProp , onChange: onChange = ()=>{}  }) {
    const [uncontrolledProp, setUncontrolledProp] = $71cd76cc60e0454e$var$useUncontrolledState({
        defaultProp: defaultProp,
        onChange: onChange
    });
    const isControlled = prop !== undefined;
    const value1 = isControlled ? prop : uncontrolledProp;
    const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
    const setValue = useCallback((nextValue)=>{
        if (isControlled) {
            const setter = nextValue;
            const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
            if (value !== prop) handleChange(value);
        } else setUncontrolledProp(nextValue);
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        handleChange
    ]);
    return [
        value1,
        setValue
    ];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp: defaultProp , onChange: onChange  }) {
    const uncontrolledState = useState(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = useRef(value);
    const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
    useEffect(()=>{
        if (prevValueRef.current !== value) {
            handleChange(value);
            prevValueRef.current = value;
        }
    }, [
        value,
        prevValueRef,
        handleChange
    ]);
    return uncontrolledState;
}

const $8927f6f2acc4f386$var$NODES = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul'
]; // Temporary while we await merge of this fix:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/55396
// prettier-ignore
/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/ const $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node)=>{
    const Node = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
        const { asChild: asChild , ...primitiveProps } = props;
        const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : node;
        useEffect(()=>{
            window[Symbol.for('radix-ui')] = true;
        }, []);
        return /*#__PURE__*/ createElement(Comp, _extends({}, primitiveProps, {
            ref: forwardedRef
        }));
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});

/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */ const $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? useLayoutEffect : ()=>{};

function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
    return useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}


const $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props)=>{
    const { present: present , children: children  } = props;
    const presence = $921a889cee6df7e8$var$usePresence(present);
    const child = typeof children === 'function' ? children({
        present: presence.isPresent
    }) : Children.only(children);
    const ref = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(presence.ref, child.ref);
    const forceMount = typeof children === 'function';
    return forceMount || presence.isPresent ? /*#__PURE__*/ cloneElement(child, {
        ref: ref
    }) : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = 'Presence';
/* -------------------------------------------------------------------------------------------------
 * usePresence
 * -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$usePresence(present) {
    const [node1, setNode] = useState();
    const stylesRef = useRef({});
    const prevPresentRef = useRef(present);
    const prevAnimationNameRef = useRef('none');
    const initialState = present ? 'mounted' : 'unmounted';
    const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(initialState, {
        mounted: {
            UNMOUNT: 'unmounted',
            ANIMATION_OUT: 'unmountSuspended'
        },
        unmountSuspended: {
            MOUNT: 'mounted',
            ANIMATION_END: 'unmounted'
        },
        unmounted: {
            MOUNT: 'mounted'
        }
    });
    useEffect(()=>{
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none';
    }, [
        state
    ]);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(styles);
            if (present) send('MOUNT');
            else if (currentAnimationName === 'none' || (styles === null || styles === void 0 ? void 0 : styles.display) === 'none') // If there is no exit animation or the element is hidden, animations won't run
            // so we unmount instantly
            send('UNMOUNT');
            else {
                /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */ const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) send('ANIMATION_OUT');
                else send('UNMOUNT');
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (node1) {
            /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */ const handleAnimationEnd = (event)=>{
                const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node1 && isCurrentAnimation) // With React 18 concurrency this update is applied
                // a frame after the animation ends, creating a flash of visible content.
                // By manually flushing we ensure they sync within a frame, removing the flash.
                flushSync(()=>send('ANIMATION_END')
                );
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node1) // if animation occurred, store its name as the previous animation.
                prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
            };
            node1.addEventListener('animationstart', handleAnimationStart);
            node1.addEventListener('animationcancel', handleAnimationEnd);
            node1.addEventListener('animationend', handleAnimationEnd);
            return ()=>{
                node1.removeEventListener('animationstart', handleAnimationStart);
                node1.removeEventListener('animationcancel', handleAnimationEnd);
                node1.removeEventListener('animationend', handleAnimationEnd);
            };
        } else // Transition to the unmounted state if the node is removed prematurely.
        // We avoid doing so during cleanup as the node may change but still exist.
        send('ANIMATION_END');
    }, [
        node1,
        send
    ]);
    return {
        isPresent: [
            'mounted',
            'unmountSuspended'
        ].includes(state),
        ref: useCallback((node)=>{
            if (node) stylesRef.current = getComputedStyle(node);
            setNode(node);
        }, [])
    };
}
/* -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$getAnimationName(styles) {
    return (styles === null || styles === void 0 ? void 0 : styles.animationName) || 'none';
}

const $1746a345f3d73bb7$var$useReactId = $3DjNB$react['useId'.toString()] || (()=>undefined
);
let $1746a345f3d73bb7$var$count = 0;
function $1746a345f3d73bb7$export$f680877a34711e37(deterministicId) {
    const [id, setId] = $3DjNB$react.useState($1746a345f3d73bb7$var$useReactId()); // React versions older than 18 will have client-side ids only.
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (!deterministicId) setId((reactId)=>reactId !== null && reactId !== void 0 ? reactId : String($1746a345f3d73bb7$var$count++)
        );
    }, [
        deterministicId
    ]);
    return deterministicId || (id ? `radix-${id}` : '');
}

/* -------------------------------------------------------------------------------------------------
 * Collapsible
 * -----------------------------------------------------------------------------------------------*/ const $409067139f391064$var$COLLAPSIBLE_NAME = 'Collapsible';
const [$409067139f391064$var$createCollapsibleContext, $409067139f391064$export$952b32dcbe73087a] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($409067139f391064$var$COLLAPSIBLE_NAME);
const [$409067139f391064$var$CollapsibleProvider, $409067139f391064$var$useCollapsibleContext] = $409067139f391064$var$createCollapsibleContext($409067139f391064$var$COLLAPSIBLE_NAME);
const $409067139f391064$export$6eb0f7ddcda6131f = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
    const { __scopeCollapsible: __scopeCollapsible , open: openProp , defaultOpen: defaultOpen , disabled: disabled , onOpenChange: onOpenChange , ...collapsibleProps } = props;
    const [open = false, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    return /*#__PURE__*/ createElement($409067139f391064$var$CollapsibleProvider, {
        scope: __scopeCollapsible,
        disabled: disabled,
        contentId: $1746a345f3d73bb7$export$f680877a34711e37(),
        open: open,
        onOpenToggle: useCallback(()=>setOpen((prevOpen)=>!prevOpen
            )
        , [
            setOpen
        ])
    }, /*#__PURE__*/ createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
        "data-state": $409067139f391064$var$getState(open),
        "data-disabled": disabled ? '' : undefined
    }, collapsibleProps, {
        ref: forwardedRef
    })));
});
/* -------------------------------------------------------------------------------------------------
 * CollapsibleTrigger
 * -----------------------------------------------------------------------------------------------*/ const $409067139f391064$var$TRIGGER_NAME = 'CollapsibleTrigger';
const $409067139f391064$export$c135dce7b15bbbdc = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
    const { __scopeCollapsible: __scopeCollapsible , ...triggerProps } = props;
    const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$TRIGGER_NAME, __scopeCollapsible);
    return /*#__PURE__*/ createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends({
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": $409067139f391064$var$getState(context.open),
        "data-disabled": context.disabled ? '' : undefined,
        disabled: context.disabled
    }, triggerProps, {
        ref: forwardedRef,
        onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, context.onOpenToggle)
    }));
});
/* -------------------------------------------------------------------------------------------------
 * CollapsibleContent
 * -----------------------------------------------------------------------------------------------*/ const $409067139f391064$var$CONTENT_NAME = 'CollapsibleContent';
const $409067139f391064$export$aadde00976f34151 = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...contentProps } = props;
    const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$CONTENT_NAME, props.__scopeCollapsible);
    return /*#__PURE__*/ createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || context.open
    }, ({ present: present  })=>/*#__PURE__*/ createElement($409067139f391064$var$CollapsibleContentImpl, _extends({}, contentProps, {
            ref: forwardedRef,
            present: present
        }))
    );
});
/* -----------------------------------------------------------------------------------------------*/ const $409067139f391064$var$CollapsibleContentImpl = /*#__PURE__*/ forwardRef((props, forwardedRef)=>{
    const { __scopeCollapsible: __scopeCollapsible , present: present , children: children , ...contentProps } = props;
    const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$CONTENT_NAME, __scopeCollapsible);
    const [isPresent, setIsPresent] = useState(present);
    const ref = useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    const heightRef = useRef(0);
    const height = heightRef.current;
    const widthRef = useRef(0);
    const width = widthRef.current; // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isOpen = context.open || isPresent;
    const isMountAnimationPreventedRef = useRef(isOpen);
    const originalStylesRef = useRef();
    useEffect(()=>{
        const rAF = requestAnimationFrame(()=>isMountAnimationPreventedRef.current = false
        );
        return ()=>cancelAnimationFrame(rAF)
        ;
    }, []);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        const node = ref.current;
        if (node) {
            originalStylesRef.current = originalStylesRef.current || {
                transitionDuration: node.style.transitionDuration,
                animationName: node.style.animationName
            }; // block any animations/transitions so the element renders at its full dimensions
            node.style.transitionDuration = '0s';
            node.style.animationName = 'none'; // get width and height from full dimensions
            const rect = node.getBoundingClientRect();
            heightRef.current = rect.height;
            widthRef.current = rect.width; // kick off any animations/transitions that were originally set up if it isn't the initial mount
            if (!isMountAnimationPreventedRef.current) {
                node.style.transitionDuration = originalStylesRef.current.transitionDuration;
                node.style.animationName = originalStylesRef.current.animationName;
            }
            setIsPresent(present);
        }
    /**
     * depends on `context.open` because it will change to `false`
     * when a close is triggered but `present` will be `false` on
     * animation end (so when close finishes). This allows us to
     * retrieve the dimensions *before* closing.
     */ }, [
        context.open,
        present
    ]);
    return /*#__PURE__*/ createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
        "data-state": $409067139f391064$var$getState(context.open),
        "data-disabled": context.disabled ? '' : undefined,
        id: context.contentId,
        hidden: !isOpen
    }, contentProps, {
        ref: composedRefs,
        style: {
            [`--radix-collapsible-content-height`]: height ? `${height}px` : undefined,
            [`--radix-collapsible-content-width`]: width ? `${width}px` : undefined,
            ...props.style
        }
    }), isOpen && children);
});
/* -----------------------------------------------------------------------------------------------*/ function $409067139f391064$var$getState(open) {
    return open ? 'open' : 'closed';
}
const $409067139f391064$export$be92b6f5f03c0fe9 = $409067139f391064$export$6eb0f7ddcda6131f;
const $409067139f391064$export$41fb9f06171c75f4 = $409067139f391064$export$c135dce7b15bbbdc;
const $409067139f391064$export$7c6e2c02157bb7d2 = $409067139f391064$export$aadde00976f34151;

const $f631663db3294ace$var$DirectionContext = /*#__PURE__*/ createContext(undefined);
/* -----------------------------------------------------------------------------------------------*/ function $f631663db3294ace$export$b39126d51d94e6f3(localDir) {
    const globalDir = useContext($f631663db3294ace$var$DirectionContext);
    return localDir || globalDir || 'ltr';
}

/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$ACCORDION_NAME = 'Accordion';
const $1bf158f521e1b1b4$var$ACCORDION_KEYS = [
    'Home',
    'End',
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight'
];
const [$1bf158f521e1b1b4$var$Collection, $1bf158f521e1b1b4$var$useCollection, $1bf158f521e1b1b4$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($1bf158f521e1b1b4$var$ACCORDION_NAME);
const [$1bf158f521e1b1b4$var$createAccordionContext, $1bf158f521e1b1b4$export$9748edc328a73be1] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($1bf158f521e1b1b4$var$ACCORDION_NAME, [
    $1bf158f521e1b1b4$var$createCollectionScope,
    $409067139f391064$export$952b32dcbe73087a
]);
const $1bf158f521e1b1b4$var$useCollapsibleScope = $409067139f391064$export$952b32dcbe73087a();
const $1bf158f521e1b1b4$export$a766cd26d0d69044 = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { type: type , ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$Collection.Provider, {
        scope: props.__scopeAccordion
    }, type === 'multiple' ? /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionImplMultiple, _extends({}, multipleProps, {
        ref: forwardedRef
    })) : /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionImplSingle, _extends({}, singleProps, {
        ref: forwardedRef
    })));
});
$1bf158f521e1b1b4$export$a766cd26d0d69044.propTypes = {
    type (props) {
        const value = props.value || props.defaultValue;
        if (props.type && ![
            'single',
            'multiple'
        ].includes(props.type)) return new Error('Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.');
        if (props.type === 'multiple' && typeof value === 'string') return new Error('Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.');
        if (props.type === 'single' && Array.isArray(value)) return new Error('Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.');
        return null;
    }
};
/* -----------------------------------------------------------------------------------------------*/ const [$1bf158f521e1b1b4$var$AccordionValueProvider, $1bf158f521e1b1b4$var$useAccordionValueContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
const [$1bf158f521e1b1b4$var$AccordionCollapsibleProvider, $1bf158f521e1b1b4$var$useAccordionCollapsibleContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, {
    collapsible: false
});
const $1bf158f521e1b1b4$var$AccordionImplSingle = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , collapsible: collapsible = false , ...accordionSingleProps } = props;
    const [value, setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    return /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
        scope: props.__scopeAccordion,
        value: value ? [
            value
        ] : [],
        onItemOpen: setValue,
        onItemClose: $3DjNB$react__default.useCallback(()=>collapsible && setValue('')
        , [
            collapsible,
            setValue
        ])
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: collapsible
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionImpl, _extends({}, accordionSingleProps, {
        ref: forwardedRef
    }))));
});
/* -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$AccordionImplMultiple = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...accordionMultipleProps } = props;
    const [value1 = [], setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    const handleItemOpen = $3DjNB$react__default.useCallback((itemValue)=>setValue((prevValue = [])=>[
                ...prevValue,
                itemValue
            ]
        )
    , [
        setValue
    ]);
    const handleItemClose = $3DjNB$react__default.useCallback((itemValue)=>setValue((prevValue = [])=>prevValue.filter((value)=>value !== itemValue
            )
        )
    , [
        setValue
    ]);
    return /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
        scope: props.__scopeAccordion,
        value: value1,
        onItemOpen: handleItemOpen,
        onItemClose: handleItemClose
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: true
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionImpl, _extends({}, accordionMultipleProps, {
        ref: forwardedRef
    }))));
});
/* -----------------------------------------------------------------------------------------------*/ const [$1bf158f521e1b1b4$var$AccordionImplProvider, $1bf158f521e1b1b4$var$useAccordionContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
const $1bf158f521e1b1b4$var$AccordionImpl = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , disabled: disabled , dir: dir , orientation: orientation = 'vertical' , ...accordionProps } = props;
    const accordionRef = $3DjNB$react__default.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(accordionRef, forwardedRef);
    const getItems = $1bf158f521e1b1b4$var$useCollection(__scopeAccordion);
    const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
    const isDirectionLTR = direction === 'ltr';
    const handleKeyDown = $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event)=>{
        var _triggerCollection$cl;
        if (!$1bf158f521e1b1b4$var$ACCORDION_KEYS.includes(event.key)) return;
        const target = event.target;
        const triggerCollection = getItems().filter((item)=>{
            var _item$ref$current;
            return !((_item$ref$current = item.ref.current) !== null && _item$ref$current !== void 0 && _item$ref$current.disabled);
        });
        const triggerIndex = triggerCollection.findIndex((item)=>item.ref.current === target
        );
        const triggerCount = triggerCollection.length;
        if (triggerIndex === -1) return; // Prevents page scroll while user is navigating
        event.preventDefault();
        let nextIndex = triggerIndex;
        const homeIndex = 0;
        const endIndex = triggerCount - 1;
        const moveNext = ()=>{
            nextIndex = triggerIndex + 1;
            if (nextIndex > endIndex) nextIndex = homeIndex;
        };
        const movePrev = ()=>{
            nextIndex = triggerIndex - 1;
            if (nextIndex < homeIndex) nextIndex = endIndex;
        };
        switch(event.key){
            case 'Home':
                nextIndex = homeIndex;
                break;
            case 'End':
                nextIndex = endIndex;
                break;
            case 'ArrowRight':
                if (orientation === 'horizontal') {
                    if (isDirectionLTR) moveNext();
                    else movePrev();
                }
                break;
            case 'ArrowDown':
                if (orientation === 'vertical') moveNext();
                break;
            case 'ArrowLeft':
                if (orientation === 'horizontal') {
                    if (isDirectionLTR) movePrev();
                    else moveNext();
                }
                break;
            case 'ArrowUp':
                if (orientation === 'vertical') movePrev();
                break;
        }
        const clampedIndex = nextIndex % triggerCount;
        (_triggerCollection$cl = triggerCollection[clampedIndex].ref.current) === null || _triggerCollection$cl === void 0 || _triggerCollection$cl.focus();
    });
    return /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionImplProvider, {
        scope: __scopeAccordion,
        disabled: disabled,
        direction: dir,
        orientation: orientation
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$Collection.Slot, {
        scope: __scopeAccordion
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, accordionProps, {
        "data-orientation": orientation,
        ref: composedRefs,
        onKeyDown: disabled ? undefined : handleKeyDown
    }))));
});
/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$ITEM_NAME = 'AccordionItem';
const [$1bf158f521e1b1b4$var$AccordionItemProvider, $1bf158f521e1b1b4$var$useAccordionItemContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME);
/**
 * `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`.
 */ const $1bf158f521e1b1b4$export$d99097c13d4dac9f = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , value: value , ...accordionItemProps } = props;
    const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
    const valueContext = $1bf158f521e1b1b4$var$useAccordionValueContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
    const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
    const triggerId = $1746a345f3d73bb7$export$f680877a34711e37();
    const open1 = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$AccordionItemProvider, {
        scope: __scopeAccordion,
        open: open1,
        disabled: disabled,
        triggerId: triggerId
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($409067139f391064$export$be92b6f5f03c0fe9, _extends({
        "data-orientation": accordionContext.orientation,
        "data-state": $1bf158f521e1b1b4$var$getState(open1)
    }, collapsibleScope, accordionItemProps, {
        ref: forwardedRef,
        disabled: disabled,
        open: open1,
        onOpenChange: (open)=>{
            if (open) valueContext.onItemOpen(value);
            else valueContext.onItemClose(value);
        }
    })));
});
/* -------------------------------------------------------------------------------------------------
 * AccordionHeader
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$HEADER_NAME = 'AccordionHeader';
/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */ const $1bf158f521e1b1b4$export$5e3e5deaaf81ee41 = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...headerProps } = props;
    const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
    const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$HEADER_NAME, __scopeAccordion);
    return /*#__PURE__*/ $3DjNB$react__default.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.h3, _extends({
        "data-orientation": accordionContext.orientation,
        "data-state": $1bf158f521e1b1b4$var$getState(itemContext.open),
        "data-disabled": itemContext.disabled ? '' : undefined
    }, headerProps, {
        ref: forwardedRef
    }));
});
/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$TRIGGER_NAME = 'AccordionTrigger';
/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It
 * should always be nested inside of an `AccordionHeader`.
 */ const $1bf158f521e1b1b4$export$94e939b1f85bdd73 = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...triggerProps } = props;
    const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
    const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = $1bf158f521e1b1b4$var$useAccordionCollapsibleContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
    return /*#__PURE__*/ $3DjNB$react__default.createElement($1bf158f521e1b1b4$var$Collection.ItemSlot, {
        scope: __scopeAccordion
    }, /*#__PURE__*/ $3DjNB$react__default.createElement($409067139f391064$export$41fb9f06171c75f4, _extends({
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || undefined,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId
    }, collapsibleScope, triggerProps, {
        ref: forwardedRef
    })));
});
/* -------------------------------------------------------------------------------------------------
 * AccordionContent
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$CONTENT_NAME = 'AccordionContent';
/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */ const $1bf158f521e1b1b4$export$985b9a77379b54a0 = /*#__PURE__*/ $3DjNB$react__default.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...contentProps } = props;
    const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
    const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
    return /*#__PURE__*/ $3DjNB$react__default.createElement($409067139f391064$export$7c6e2c02157bb7d2, _extends({
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation
    }, collapsibleScope, contentProps, {
        ref: forwardedRef,
        style: {
            ['--radix-accordion-content-height']: 'var(--radix-collapsible-content-height)',
            ['--radix-accordion-content-width']: 'var(--radix-collapsible-content-width)',
            ...props.style
        }
    }));
});
/* -----------------------------------------------------------------------------------------------*/ function $1bf158f521e1b1b4$var$getState(open) {
    return open ? 'open' : 'closed';
}
const $1bf158f521e1b1b4$export$be92b6f5f03c0fe9 = $1bf158f521e1b1b4$export$a766cd26d0d69044;
const $1bf158f521e1b1b4$export$6d08773d2e66f8f2 = $1bf158f521e1b1b4$export$d99097c13d4dac9f;
const $1bf158f521e1b1b4$export$8b251419efc915eb = $1bf158f521e1b1b4$export$5e3e5deaaf81ee41;
const $1bf158f521e1b1b4$export$41fb9f06171c75f4 = $1bf158f521e1b1b4$export$94e939b1f85bdd73;
const $1bf158f521e1b1b4$export$7c6e2c02157bb7d2 = $1bf158f521e1b1b4$export$985b9a77379b54a0;

var __defProp$3 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const ActiveCircleDottedLine = (_a) => {
  var _b = _a, {
    size = "24",
    color = "currentColor"
  } = _b, attributes = __objRest$2(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsxs("svg", __spreadProps$3(__spreadValues$3({ width: size, height: size, viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, attributes), { children: [
    /* @__PURE__ */ jsxs("g", { filter: "url(#filter0_d_8860_2802)", children: [
      /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "20", height: "20", rx: "10", fill: "white" }),
      /* @__PURE__ */ jsx("path", { d: "M15.5 5.93589C13.884 5.3547 12.116 5.3547 10.5 5.93589", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M5.63037 11.632C5.94283 9.94471 6.82561 8.41606 8.13082 7.30209", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M8.13082 18.6979C6.82563 17.5839 5.94286 16.0552 5.63037 14.368", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M10.5 20.0641C12.116 20.6453 13.884 20.6453 15.5 20.0641", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M20.3696 11.632C20.0571 9.94471 19.1744 8.41606 17.8691 7.30209", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M17.8691 18.6979C19.1743 17.5839 20.0571 16.0552 20.3696 14.368", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    ] }),
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: "filter0_d_8860_2802", x: "0", y: "0", width: "26", height: "26", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB", children: [
      /* @__PURE__ */ jsx("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
      /* @__PURE__ */ jsx("feColorMatrix", { in: "SourceAlpha", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }),
      /* @__PURE__ */ jsx("feMorphology", { radius: "3", operator: "dilate", in: "SourceAlpha", result: "effect1_dropShadow_8860_2802" }),
      /* @__PURE__ */ jsx("feOffset", {}),
      /* @__PURE__ */ jsx("feComposite", { in2: "hardAlpha", operator: "out" }),
      /* @__PURE__ */ jsx("feColorMatrix", { type: "matrix", values: "0 0 0 0 0.231373 0 0 0 0 0.509804 0 0 0 0 0.964706 0 0 0 0.2 0" }),
      /* @__PURE__ */ jsx("feBlend", { mode: "normal", in2: "BackgroundImageFix", result: "effect1_dropShadow_8860_2802" }),
      /* @__PURE__ */ jsx("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect1_dropShadow_8860_2802", result: "shape" })
    ] }) })
  ] }));
};

var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const Accordion = (_a) => {
  var _b = _a, { children } = _b, props = __objRest$1(_b, ["children"]);
  return /* @__PURE__ */ jsx($1bf158f521e1b1b4$export$be92b6f5f03c0fe9, __spreadProps$2(__spreadValues$2({}, props), { children }));
};
const Item = (_c) => {
  var _d = _c, {
    title,
    subtitle,
    description,
    required,
    tooltip,
    children,
    className,
    complete,
    headingSize = "large",
    customTrigger = void 0,
    forceMountContent = void 0,
    active,
    triggerable
  } = _d, props = __objRest$1(_d, [
    "title",
    "subtitle",
    "description",
    "required",
    "tooltip",
    "children",
    "className",
    "complete",
    "headingSize",
    "customTrigger",
    "forceMountContent",
    "active",
    "triggerable"
  ]);
  return /* @__PURE__ */ jsxs(
    $1bf158f521e1b1b4$export$6d08773d2e66f8f2,
    __spreadProps$2(__spreadValues$2({}, props), {
      className: clx(
        "border-grey-20 group border-t last:mb-0",
        "py-1 px-8",
        className
      ),
      children: [
        /* @__PURE__ */ jsx($1bf158f521e1b1b4$export$8b251419efc915eb, { className: "px-1", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-[10px]", children: complete ? /* @__PURE__ */ jsx(CheckCircleSolid, { className: "text-ui-fg-interactive" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                active && /* @__PURE__ */ jsx(ActiveCircleDottedLine, { size: 20, className: "text-ui-fg-interactive rounded-full" }),
                !active && /* @__PURE__ */ jsx(CircleMiniSolid, { className: "text-ui-fg-muted" })
              ] }) }),
              /* @__PURE__ */ jsx(Heading, { level: "h3", className: clx(
                "text-ui-fg-base"
              ), children: title })
            ] }),
            /* @__PURE__ */ jsx($1bf158f521e1b1b4$export$41fb9f06171c75f4, { children: customTrigger || /* @__PURE__ */ jsx(MorphingTrigger, {}) })
          ] }),
          subtitle && /* @__PURE__ */ jsx(Text, { as: "span", size: "small", className: "mt-1", children: subtitle })
        ] }) }),
        /* @__PURE__ */ jsx(
          $1bf158f521e1b1b4$export$7c6e2c02157bb7d2,
          {
            forceMount: forceMountContent,
            className: clx(
              "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none px-1"
            ),
            children: /* @__PURE__ */ jsxs("div", { className: "inter-base-regular group-radix-state-closed:animate-accordion-close", children: [
              description && /* @__PURE__ */ jsx(Text, { children: description }),
              /* @__PURE__ */ jsx("div", { className: "w-full", children })
            ] })
          }
        )
      ]
    })
  );
};
Accordion.Item = Item;
const MorphingTrigger = () => {
  return /* @__PURE__ */ jsx("div", { className: "btn-ghost rounded-rounded group relative p-[6px]", children: /* @__PURE__ */ jsxs("div", { className: "h-5 w-5", children: [
    /* @__PURE__ */ jsx("span", { className: "bg-grey-50 rounded-circle group-radix-state-open:rotate-90 absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] duration-300" }),
    /* @__PURE__ */ jsx("span", { className: "bg-grey-50 rounded-circle group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px] duration-300" })
  ] }) });
};

var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const GetStarted = (_a) => {
  var _b = _a, {
    size = "40",
    color = "currentColor"
  } = _b, attributes = __objRest(_b, [
    "size",
    "color"
  ]);
  return /* @__PURE__ */ jsxs("svg", __spreadProps$1(__spreadValues$1({ width: size, height: size, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, attributes), { children: [
    /* @__PURE__ */ jsx("rect", { width: size, height: size, fill: "url(#pattern0)" }),
    /* @__PURE__ */ jsxs("defs", { children: [
      /* @__PURE__ */ jsx("pattern", { id: "pattern0", patternContentUnits: "objectBoundingBox", width: "1", height: "1", children: /* @__PURE__ */ jsx("use", { xlinkHref: "#image0_9408_244", transform: "scale(0.00625)" }) }),
      /* @__PURE__ */ jsx("image", { id: "image0_9408_244", width: "160", height: "160", xlinkHref: "data:image/png;base64,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" })
    ] })
  ] }));
};

const ProductsListNextjs = ({ onNext, isComplete }) => {
  const { mutateAsync: createCollection, isLoading: collectionLoading } = useAdminCreateCollection();
  const { mutateAsync: createProduct, isLoading: productLoading } = useAdminCreateProduct();
  const { client } = useMedusa();
  const isLoading = collectionLoading || productLoading;
  const createSample = async () => {
    try {
      const { collection } = await createCollection({
        title: "Merch",
        handle: "merch"
      });
      const regions = await prepareRegions(client);
      const tryCreateProduct = async (sampleProduct) => {
        try {
          return (await createProduct(sampleProduct)).product;
        } catch (e) {
          return null;
        }
      };
      let product;
      const sampleProducts = getSampleProducts({
        regions,
        collection_id: collection.id
      });
      await Promise.all(
        sampleProducts.map(async (sampleProduct, index) => {
          const createdProduct = await tryCreateProduct(sampleProduct);
          if (index === 0 && createProduct) {
            product = createdProduct;
          }
        })
      );
      onNext(product);
    } catch (e) {
      console.error(e);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Text, { className: "mb-2", children: "Products is Medusa represent the products you sell. You can set their general details including a title and description. Each product has options and variants, and you can set a price for each variant." }),
    /* @__PURE__ */ jsx(Text, { children: "Click the button below to create sample products." }),
    !isComplete && /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-6", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "primary",
        size: "base",
        onClick: () => createSample(),
        isLoading,
        children: "Create sample products"
      }
    ) })
  ] });
};

const ProductDetailNextjs = ({ onNext, isComplete, data }) => {
  const { product, isLoading: productIsLoading } = useAdminProduct(data == null ? void 0 : data.product_id);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Text, { children: "We have now created a few sample products in your Medusa store. You can scroll down to see what the Product Detail view looks like in the Admin dashboard. This is also the view you use to edit existing products." }),
      /* @__PURE__ */ jsxs(Text, { children: [
        "To view the products in your store, you can visit the Next.js Storefront that was installed with ",
        /* @__PURE__ */ jsx("code", { children: "create-medusa-app" }),
        "."
      ] }),
      /* @__PURE__ */ jsx(Text, { children: "The Next.js Storefront Starter is a template that helps you start building an ecommerce store with Medusa. You control the code for the storefront and you can customize it further to fit your specific needs." }),
      /* @__PURE__ */ jsx(Text, { children: "Click the button below to view the products in your Next.js Storefront." }),
      /* @__PURE__ */ jsxs(Text, { children: [
        "Having trouble? Click",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://docs.medusajs.com/starters/nextjs-medusa-starter#troubleshooting-nextjs-storefront-not-working",
            target: "_blank",
            className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover",
            children: "here"
          }
        ),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `http://localhost:8000/products/${product == null ? void 0 : product.handle}?onboarding=true`,
          target: "_blank",
          children: /* @__PURE__ */ jsx(Button, { variant: "primary", size: "base", isLoading: productIsLoading, children: "Open Next.js Storefront" })
        }
      ),
      !isComplete && /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "base", onClick: () => onNext(), children: "Next step" })
    ] })
  ] });
};

const OrdersListNextjs = ({ isComplete, data }) => {
  const { product } = useAdminProduct(data.product_id);
  const { mutateAsync: createCart, isLoading: cartIsLoading } = useCreateCart();
  const { client } = useMedusa();
  const prepareNextjsCheckout = async () => {
    var _a, _b;
    const variant = (_a = product.variants[0]) != null ? _a : null;
    try {
      const regions = await prepareRegions(client);
      await prepareShippingOptions(client, regions[0]);
      const { cart } = await createCart({
        region_id: (_b = regions[0]) == null ? void 0 : _b.id,
        items: [
          {
            variant_id: variant == null ? void 0 : variant.id,
            quantity: 1
          }
        ]
      });
      window.open(`http://localhost:8000/checkout?cart_id=${cart == null ? void 0 : cart.id}&onboarding=true`, "_blank");
    } catch (e) {
      console.error(e);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Text, { children: "The last step is to create a sample order using one of your products. You can then view your order\u2019s details, process its payment, fulfillment, inventory, and more." }),
      /* @__PURE__ */ jsx(Text, { children: "You can use the button below to experience hand-first the checkout flow in the Next.js storefront. After placing the order in the storefront, you\u2019ll be directed back here to view the order\u2019s details." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: !isComplete && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "primary",
        size: "base",
        onClick: () => prepareNextjsCheckout(),
        isLoading: cartIsLoading,
        children: "Place an order in your storefront"
      }
    ) }) })
  ] });
};

const OrderDetailNextjs = () => {
  const queryParams = `?ref=onboarding&type=${process.env.MEDUSA_ADMIN_ONBOARDING_TYPE || "nextjs"}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Text, { size: "small", className: "mb-6", children: "You finished the setup guide \u{1F389}. You have now a complete ecommerce store with a backend, admin, and a Next.js storefront. Feel free to play around with each of these components to experience all commerce features that Medusa provides." }),
    /* @__PURE__ */ jsx(Heading, { level: "h2", className: "text-ui-fg-base pt-6 border-t border-ui-border-base border-solid mb-2", children: "Continue Building your Ecommerce Store" }),
    /* @__PURE__ */ jsx(Text, { size: "small", children: "Your ecommerce store provides all basic ecommerce features you need to start selling. You can add more functionalities, add plugins for third-party integrations, and customize the storefront\u2019s look and feel to support your use case." }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mt-6 pb-6 mb-6 border-b border-ui-border-base border-solid auto-rows-fr", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://docs.medusajs.com/plugins/overview${queryParams}`,
          target: "_blank",
          className: "flex",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 rounded-rounded flex items-start bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mr-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base rounded-lg border border-ui-border-strong p-1 flex justify-center items-center", children: /* @__PURE__ */ jsx(Badge, { type: "icon", children: /* @__PURE__ */ jsx(SquaresPlusSolid, {}) }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xsmall", weight: "plus", className: "mb-1 text-ui-fg-base", children: "Install Plugins" }),
                  /* @__PURE__ */ jsx(Text, { size: "small", children: "Install plugins for payment, fulfillment, search, and more, and integrate them in your storefront." })
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://docs.medusajs.com/modules/overview${queryParams}`,
          target: "_blank",
          className: "flex",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 rounded-rounded items-start flex bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mr-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base rounded-lg border border-ui-border-strong p-1 flex justify-center items-center", children: /* @__PURE__ */ jsx(Badge, { type: "icon", children: /* @__PURE__ */ jsx(CurrencyDollarSolid, {}) }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xsmall", weight: "plus", className: "mb-1 text-ui-fg-base", children: "Add Commerce Features" }),
                  /* @__PURE__ */ jsx(Text, { size: "small", children: "Learn about all available commerce features in Medusa and how to add them in your storefront" })
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://docs.medusajs.com/starters/nextjs-medusa-starter${queryParams}`,
          target: "_blank",
          className: "flex",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 rounded-rounded items-start flex bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mr-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base rounded-lg border border-ui-border-strong p-1 flex justify-center items-center", children: /* @__PURE__ */ jsx(Badge, { type: "icon", children: /* @__PURE__ */ jsx(NextJs, {}) }) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "xsmall", weight: "plus", className: "mb-1 text-ui-fg-base", children: "Build with the Next.js Storefront" }),
                  /* @__PURE__ */ jsx(Text, { size: "small", children: "Learn about the Next.js starter storefront\u2019s features and how to customize it." })
                ] })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "You can find more useful guides in",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://docs.medusajs.com/?ref=onboarding",
          target: "_blank",
          className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover",
          children: "our documentation"
        }
      ),
      ". If you like Medusa, please",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/medusajs/medusa",
          target: "_blank",
          className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover",
          children: "star us on GitHub"
        }
      ),
      "."
    ] })
  ] });
};

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const QUERY_KEY = ["onboarding_state"];
const OnboardingFlow = (props) => {
  var _a;
  const { data, isLoading } = useAdminCustomQuery("/onboarding", QUERY_KEY);
  const { mutate } = useAdminCustomPost("/onboarding", QUERY_KEY);
  const navigate = useNavigate();
  const location = useLocation();
  const { client } = useMedusa();
  const currentStep = useMemo(() => {
    var _a2;
    return (_a2 = data == null ? void 0 : data.status) == null ? void 0 : _a2.current_step;
  }, [data]);
  const [openStep, setOpenStep] = useState(currentStep);
  const [completed, setCompleted] = useState(false);
  const setStepComplete = ({
    step_id,
    extraData,
    onComplete: onComplete2
  }) => {
    const next = steps[findStepIndex(step_id) + 1];
    mutate(__spreadValues({ current_step: next.id }, extraData), {
      onSuccess: onComplete2
    });
  };
  const [searchParams] = useSearchParams();
  const steps = useMemo(() => {
    {
      switch (process.env.MEDUSA_ADMIN_ONBOARDING_TYPE) {
        case "nextjs":
          return [
            {
              id: "create_product_nextjs",
              title: "Create Products",
              component: ProductsListNextjs,
              onNext: (product) => {
                setStepComplete({
                  step_id: "create_product_nextjs",
                  extraData: { product_id: product.id },
                  onComplete: () => {
                    if (!location.pathname.startsWith(`/a/products/${product.id}`)) {
                      navigate(`/a/products/${product.id}`);
                    }
                  }
                });
              }
            },
            {
              id: "preview_product_nextjs",
              title: "Preview Product in your Next.js Storefront",
              component: ProductDetailNextjs,
              onNext: () => {
                setStepComplete({
                  step_id: "preview_product_nextjs",
                  onComplete: () => navigate(`/a/orders`)
                });
              }
            },
            {
              id: "create_order_nextjs",
              title: "Create an Order using your Next.js Storefront",
              component: OrdersListNextjs,
              onNext: (order) => {
                setStepComplete({
                  step_id: "create_order_nextjs",
                  onComplete: () => {
                    if (!location.pathname.startsWith(`/a/orders/${order.id}`)) {
                      navigate(`/a/orders/${order.id}`);
                    }
                  }
                });
              }
            },
            {
              id: "setup_finished_nextjs",
              title: "Setup Finished: Continue Building your Ecommerce Store",
              component: OrderDetailNextjs
            }
          ];
        default:
          return [
            {
              id: "create_product",
              title: "Create Product",
              component: ProductsListDefault,
              onNext: (product) => {
                setStepComplete({
                  step_id: "create_product",
                  extraData: { product_id: product.id },
                  onComplete: () => {
                    if (!location.pathname.startsWith(`/a/products/${product.id}`)) {
                      navigate(`/a/products/${product.id}`);
                    }
                  }
                });
              }
            },
            {
              id: "preview_product",
              title: "Preview Product",
              component: ProductDetailDefault,
              onNext: () => {
                setStepComplete({
                  step_id: "preview_product",
                  onComplete: () => navigate(`/a/orders`)
                });
              }
            },
            {
              id: "create_order",
              title: "Create an Order",
              component: OrdersListDefault,
              onNext: (order) => {
                setStepComplete({
                  step_id: "create_order",
                  onComplete: () => {
                    if (!location.pathname.startsWith(`/a/orders/${order.id}`)) {
                      navigate(`/a/orders/${order.id}`);
                    }
                  }
                });
              }
            },
            {
              id: "setup_finished",
              title: "Setup Finished: Start developing with Medusa",
              component: OrderDetailDefault
            }
          ];
      }
    }
  }, [location.pathname]);
  const findStepIndex = useCallback((step_id) => {
    return steps.findIndex((step) => step.id === step_id);
  }, [steps]);
  const isStepComplete = useCallback((step_id) => {
    return findStepIndex(currentStep) > findStepIndex(step_id);
  }, [findStepIndex, currentStep]);
  const getOnboardingParamStepData = useCallback(async (onboardingStep, data2) => {
    switch (onboardingStep) {
      case "setup_finished_nextjs":
      case "setup_finished":
        if (!(data2 == null ? void 0 : data2.orderId) && "order" in props) {
          return props.order;
        }
        const orderId = (data2 == null ? void 0 : data2.orderId) || searchParams.get("order_id");
        if (orderId) {
          return (await client.admin.orders.retrieve(orderId)).order;
        }
        throw new Error("Required `order_id` parameter was not passed as a parameter");
      case "preview_product_nextjs":
      case "preview_product":
        if (!(data2 == null ? void 0 : data2.productId) && "product" in props) {
          return props.product;
        }
        const productId = (data2 == null ? void 0 : data2.productId) || searchParams.get("product_id");
        if (productId) {
          return (await client.admin.products.retrieve(productId)).product;
        }
        throw new Error("Required `product_id` parameter was not passed as a parameter");
      default:
        return void 0;
    }
  }, [searchParams, props]);
  const isProductCreateStep = useMemo(() => {
    return currentStep === "create_product" || currentStep === "create_product_nextjs";
  }, [currentStep]);
  const isOrderCreateStep = useMemo(() => {
    return currentStep === "create_order" || currentStep === "create_order_nextjs";
  }, [currentStep]);
  useEffect(() => {
    setOpenStep(currentStep);
    if (findStepIndex(currentStep) === steps.length - 1)
      setCompleted(true);
  }, [currentStep, findStepIndex]);
  useEffect(() => {
    var _a2, _b;
    if (location.pathname.startsWith("/a/products/prod_") && isProductCreateStep && "product" in props) {
      const currentStepIndex = findStepIndex(currentStep);
      (_b = (_a2 = steps[currentStepIndex]).onNext) == null ? void 0 : _b.call(_a2, props.product);
    }
  }, [location.pathname, isProductCreateStep]);
  useEffect(() => {
    var _a2, _b;
    if (location.pathname.startsWith("/a/orders/order_") && isOrderCreateStep && "order" in props) {
      const currentStepIndex = findStepIndex(currentStep);
      (_b = (_a2 = steps[currentStepIndex]).onNext) == null ? void 0 : _b.call(_a2, props.order);
    }
  }, [location.pathname, isOrderCreateStep]);
  useEffect(() => {
    const onboardingStep = searchParams.get("onboarding_step");
    const onboardingStepIndex = findStepIndex(onboardingStep);
    if (onboardingStep && onboardingStepIndex !== -1 && onboardingStep !== openStep) {
      const openStepIndex = findStepIndex(openStep);
      if (onboardingStepIndex !== openStepIndex + 1) {
        return;
      }
      getOnboardingParamStepData(onboardingStep).then((data2) => {
        var _a2, _b;
        (_b = (_a2 = steps[openStepIndex]).onNext) == null ? void 0 : _b.call(_a2, data2);
      }).catch((e) => console.error(e));
    }
  }, [searchParams, openStep, getOnboardingParamStepData]);
  if (!isLoading && ((_a = data == null ? void 0 : data.status) == null ? void 0 : _a.is_complete) && !localStorage.getItem("override_onboarding_finish"))
    return null;
  const onStart = () => {
    mutate({ current_step: steps[0].id });
    navigate(`/a/products`);
  };
  const onComplete = () => {
    setCompleted(true);
  };
  const onHide = () => {
    mutate({ is_complete: true });
  };
  const getStartedText = () => {
    switch (process.env.MEDUSA_ADMIN_ONBOARDING_TYPE) {
      case "nextjs":
        return "Learn the basics of Medusa by creating your first order using the Next.js storefront.";
      default:
        return "Learn the basics of Medusa by creating your first order.";
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Container, { className: clx(
    "text-ui-fg-subtle px-0 pt-0 pb-4",
    {
      "mb-4": completed
    }
  ), children: /* @__PURE__ */ jsxs(
    Accordion,
    {
      type: "single",
      value: openStep,
      onValueChange: (value) => setOpenStep(value),
      children: [
        /* @__PURE__ */ jsxs("div", { className: clx(
          "flex py-6 px-8",
          {
            "items-start": completed,
            "items-center": !completed
          }
        ), children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 p-1 flex justify-center items-center rounded-full bg-ui-bg-base shadow-elevation-card-rest mr-4", children: /* @__PURE__ */ jsx(GetStarted, {}) }),
          !completed ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Heading, { level: "h1", className: "text-ui-fg-base", children: "Get started" }),
              /* @__PURE__ */ jsx(Text, { children: getStartedText() })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-start gap-2", children: !!currentStep ? /* @__PURE__ */ jsx(Fragment, { children: currentStep === steps[steps.length - 1].id ? /* @__PURE__ */ jsx(
              Button,
              {
                variant: "primary",
                size: "base",
                onClick: () => onComplete(),
                children: "Complete Setup"
              }
            ) : /* @__PURE__ */ jsx(
              Button,
              {
                variant: "secondary",
                size: "base",
                onClick: () => onHide(),
                children: "Cancel Setup"
              }
            ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "secondary",
                  size: "base",
                  onClick: () => onHide(),
                  children: "Close"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "primary",
                  size: "base",
                  onClick: () => onStart(),
                  children: "Begin setup"
                }
              )
            ] }) })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Heading, { level: "h1", className: "text-ui-fg-base", children: "Thank you for completing the setup guide!" }),
              /* @__PURE__ */ jsxs(Text, { children: [
                "This whole experience was built using our new",
                " ",
                /* @__PURE__ */ jsx("strong", { children: "widgets" }),
                " feature.",
                /* @__PURE__ */ jsx("br", {}),
                " You can find out more details and build your own by following",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://docs.medusajs.com/admin/onboarding?ref=onboarding",
                    target: "_blank",
                    className: "text-blue-500 font-semibold",
                    children: "our guide"
                  }
                ),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-start gap-2", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "secondary",
                size: "base",
                onClick: () => onHide(),
                children: "Close"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: (!completed ? steps : steps.slice(-1)).map((step) => {
          const isComplete = isStepComplete(step.id);
          const isCurrent = currentStep === step.id;
          return /* @__PURE__ */ jsx(
            Accordion.Item,
            __spreadProps(__spreadValues({
              title: step.title,
              value: step.id,
              headingSize: "medium",
              active: isCurrent,
              complete: isComplete,
              disabled: !isComplete && !isCurrent
            }, !isComplete && !isCurrent && {
              customTrigger: /* @__PURE__ */ jsx(Fragment, {})
            }), {
              children: /* @__PURE__ */ jsx("div", { className: "pl-14 pb-6 pr-7", children: /* @__PURE__ */ jsx(
                step.component,
                __spreadValues({
                  onNext: step.onNext,
                  isComplete,
                  data: data == null ? void 0 : data.status
                }, props)
              ) })
            }),
            step.id
          );
        }) })
      ]
    }
  ) }) });
};
const config = {
  zone: [
    "product.list.before",
    "product.details.before",
    "order.list.before",
    "order.details.before"
  ]
};

const entry = {
  identifier: "medusa-payment-streampay",
  extensions: [
    { Component: OnboardingFlow, config: { ...config, type: "widget" } }
  ],
};

export { entry as default };
