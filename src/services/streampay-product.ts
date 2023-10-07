import {
    buildQuery,
    FindConfig,
    ProductVariant,
    Selector,
    TransactionBaseService,
} from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import { Repository } from "typeorm";
import { StreamPayClient } from "@streampayments/streampay";
import { z } from "zod";
import { optionsSchema } from '../lib/options'
import { Logger } from "./logger"; // Assuming you have a logger module

export type StreamPayProductData = {
    product_code: string;
};

const streampayProductSchema = z.object({
    code: z.coerce.string().optional(),
    stockonhand: z.coerce.number().optional(),
    barcode: z.coerce.string().optional(),
});

/**
 * StreamPayProductService: A service layer that handles product-related operations with StreamPay.
 */
class StreamPayProductService extends TransactionBaseService {
    protected client: StreamPayClient;
    protected variantRepository: Repository<ProductVariant>;
    private logger: Logger;

    constructor(container: any, options: Record<string, unknown>) {
        super(container);
        const parsedOptions = optionsSchema.parse(options);
        this.variantRepository = this.activeManager_.getRepository(ProductVariant);
        this.client = new StreamPayClient(parsedOptions);
        this.logger = new Logger('StreamPayProductService');
    }

    /**
     * Synchronizes inventory data from StreamPay with Medusa.
     */
    async syncAllInventoryFromStreamPay(): Promise<void> {
        // Fetch products from StreamPay
        let products: Awaited<ReturnType<StreamPayClient["getProducts"]>>;
        try {
            products = await this.client.getProducts();
        } catch (e) {
            this.logger.error('Could not fetch products from StreamPay', e);
            throw new MedusaError(
                MedusaError.Types.DB_ERROR,
                "Could not fetch products from StreamPay",
            );
        }

        // Parse and validate the fetched products
        const productsArraySchema = z.array(streampayProductSchema);
        let parsedProducts: z.infer<typeof productsArraySchema>;
        try {
            parsedProducts = productsArraySchema.parse(products);
        } catch (e) {
            this.logger.error('Could not parse products from StreamPay', e);
            throw new MedusaError(
                MedusaError.Types.DB_ERROR,
                "Could not parse products from StreamPay",
            );
        }

        // Filter products with valid barcode and stock data
        const filteredProducts = parsedProducts.filter(
            (product) => product.barcode && product.stockonhand !== undefined,
        );

        // Update the variants in Medusa based on barcode or SKU
        await Promise.all(
            filteredProducts.map(async (product) => {
                let variant: ProductVariant | null = null;

                if (product.barcode) {
                    variant = await this.variantRepository.findOne({
                        where: {
                            barcode: product.barcode,
                        },
                    });
                }

                if (!variant && product.code) {
                    variant = await this.variantRepository.findOne({
                        where: {
                            sku: product.code,
                        },
                    });
                }

                if (!variant) {
                    return;
                }

                if (product.stockonhand !== undefined) {
                    variant.inventory_quantity = product.stockonhand;
                }

                variant.sku ||= product.code ?? null;
                variant.barcode ||= product.barcode ?? null;

                await this.variantRepository.save(variant);
            }),
        );
    }
}

export default StreamPayProductService;
