import { MedusaError } from '@medusajs/utils'
import { Router } from "express";
import addInvoiceCreated from "./invoice-created";

/**
 * Initializes the Express router and adds routes and middleware.
 * @param {string} rootDirectory - The root directory of the project.
 * @param {object} options - Additional options for the router.
 * @returns {Router} - The initialized router.
 */
export default (rootDirectory, options) => {
    const router = Router();

    // Middleware for token validation
    router.use((req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!options.streampaySecret) {
            throw new MedusaError(MedusaError.Types.INVALID_CONFIGURATION, "No StreamPay secret set");
        }

        if (token !== options.streampaySecret) {
            throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "Invalid token");
        }

        next();
    });

    // Add the invoice created route after the token validation middleware
    addInvoiceCreated(router, rootDirectory, options);

    return router;
};
