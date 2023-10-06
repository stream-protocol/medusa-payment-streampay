import {
    EventBusService,
    Order,
    TransactionBaseService,
    MedusaError,
} from "@medusajs/medusa";
import { StreamPayClient } from "@streampayments/streampay";
import { Repository } from "typeorm";
import { Options, optionsSchema } from "../lib/options";
import { Logger } from "./logger"; // Assuming you have a logger module

class StreamPayInvoiceService extends TransactionBaseService {
    private client: StreamPayClient;
    private orderRepository_: Repository<Order>;
    private eventBusService_: EventBusService;
    private options_: Options;
    private logger: Logger;

    constructor(container: any, options: Record<string, unknown>) {
        super(container);
        const parsedOptions = optionsSchema.parse(options);
        this.orderRepository_ = this.activeManager_.getRepository(Order);
        this.client = new StreamPayClient(parsedOptions);
        this.eventBusService_ = container.eventBusService;
        this.options_ = parsedOptions;
        this.logger = new Logger('StreamPayInvoiceService');
    }

    /**
     * Fetches the invoice from StreamPay and emits an event indicating the invoice is ready.
     * @param invoiceId - The ID of the invoice in StreamPay.
     * @param orderDisplayId - The display ID of the order in Medusa.
     */
    public async invoiceReady(
        invoiceId: string | number,
        orderDisplayId: number,
    ): Promise<void> {
        try {
            const order = await this.orderRepository_.findOne({
                where: { display_id: orderDisplayId },
                select: ["id"],
            });

            if (!order) {
                this.logger.error(`Order with display ID ${orderDisplayId} not found.`);
                throw new MedusaError(MedusaError.Types.NOT_FOUND, `Order with display ID ${orderDisplayId} not found.`);
            }

            const orderId = order.id;
            const invoiceResponse = await this.client.getInvoice(invoiceId, this.options_.invoiceForm);

            if (!invoiceResponse.data) {
                this.logger.error(`Invoice with ID ${invoiceId} not found.`);
                throw new MedusaError(MedusaError.Types.NOT_FOUND, `Invoice with ID ${invoiceId} not found.`);
            }

            const invoiceBuffer = invoiceResponse.data as Buffer;
            const invoice = invoiceBuffer.toString("base64");

            await this.eventBusService_.emit('streampay.invoice.ready', {
                invoice,
                orderId,
            });

            this.logger.info(`Invoice with ID ${invoiceId} is ready for order with display ID ${orderDisplayId}.`);
        } catch (error) {
            this.logger.error(`Failed to process invoice with ID ${invoiceId}: ${error.message}`);
            throw error;
        }
    }
}

export default StreamPayInvoiceService;
