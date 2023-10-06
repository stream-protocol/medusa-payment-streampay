import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import { Options } from "../../../lib/options";
import StreamPayInvoiceService from "../../../services/streampay-invoice";
import { StatusCodes } from "http-status-codes";
import { TypedRequestBody, validateRequest } from "zod-express-middleware";
import { z } from "zod";

export default (router: Router, rootDirectory, options: Options) => {
    const invoiceCreatedSchema = z.object({
        invoiceId: z.string().or(z.number()),
        orderId: z.coerce.number(),
    });

    /**
     * POST /invoice-created
     * Endpoint to handle the creation of invoices.
     * Request Body: { invoiceId: string | number, orderId: number }
     * Response: { success: boolean, message?: string }
     */
    router.post(
        "/invoice-created",
        validateRequest({
            body: invoiceCreatedSchema,
        }),
        wrapHandler(async (req: TypedRequestBody<typeof invoiceCreatedSchema>, res) => {
            const { invoiceId, orderId } = req.body;
            const mwInvoiceService: StreamPayInvoiceService = req.scope.resolve(
                "streampayInvoiceService",
            );

            try {
                await mwInvoiceService.invoiceReady(invoiceId, orderId);
                console.log(`Invoice ${invoiceId} for order ${orderId} is ready.`); // Logging

                res.status(StatusCodes.ACCEPTED);
                res.json({ success: true, message: "Invoice processed successfully" });
            } catch (error) {
                console.error(`Error processing invoice ${invoiceId} for order ${orderId}:`, error.message); // Detailed error logging
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Failed to process invoice" });
            }
        }),
    );
};
