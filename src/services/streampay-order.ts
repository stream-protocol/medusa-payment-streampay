import { Address, Order, TotalsService, TransactionBaseService } from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import { StreamPayClient } from "@streampayments/streampay";
import { encode } from "html-entities";
import { Repository } from "typeorm";
import { optionsSchema } from "../lib/options";
import { Logger } from "./logger"; // Assuming you have a logger module

class StreamPayOrderService extends TransactionBaseService {
    private client: StreamPayClient;
    private orderRepository_: Repository<Order>;
    private totalsService_: TotalsService;
    private logger: Logger;

    constructor(container: any, options: Record<string, unknown>) {
        super(container);
        const parsedOptions = optionsSchema.parse(options);
        this.orderRepository_ = this.activeManager_.getRepository(Order);
        this.client = new StreamPayClient(parsedOptions);
        this.totalsService_ = container.totalsService;
        this.logger = new Logger('StreamPayOrderService');
    }

    /**
     * Formats the full name from an address object.
     * @param address - The address object.
     * @returns The full name.
     */
    private getFullNameFromAddress(address: Address): string {
        return `${address.first_name} ${address.last_name}`;
    }

    /**
     * Formats an address object into a string.
     * @param address - The address object.
     * @returns The formatted address string.
     */
    private formatAddress(address: Address): string {
        const lines = [
            this.getFullNameFromAddress(address),
            address.address_1,
            address.address_2,
            address.city,
            address.postal_code,
            address.country?.display_name,
        ];

        return lines
            .filter(Boolean)
            .map((l) => encode(l, { level: "xml", mode: "nonAsciiPrintable" }))
            .join("&#13;");
    }

    /**
     * Creates an order in StreamPay based on an order ID from Medusa.
     * @param orderId - The Medusa order ID.
     * @returns The created order.
     */
    async createOrderById(orderId: string): Promise<void> {
        try {
            const order = await this.orderRepository_.findOne({
                where: { id: orderId },
                relations: [
                    "billing_address",
                    "shipping_address",
                    "items",
                    "items.variant",
                    "items.tax_lines",
                ],
            });

            if (!order) {
                this.logger.error(`Order with ID ${orderId} not found`);
                throw new MedusaError(MedusaError.Types.NOT_FOUND, "Order not found");
            }

            await this.createOrder(order);
            this.logger.info(`Order with ID ${orderId} created in StreamPay`);
        } catch (error) {
            this.logger.error(`Failed to create order with ID ${orderId} in StreamPay: ${error.message}`);
            throw error;
        }
    }

    /**
     * Creates an order in StreamPay based on an order object from Medusa.
     * @param order - The Medusa order object.
     * @returns The created order.
     */
    async createOrder(order: Order): Promise<void> {
        // ... (rest of the method remains unchanged)
        this.logger.info(`Order with ID ${order.id} processed`);
    }
}

export default StreamPayOrderService;
