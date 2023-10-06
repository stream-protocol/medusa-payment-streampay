import { wrapHandler } from '@medusajs/medusa';
import { Router } from 'express';
import StreamPayProductService from '../../../services/streampay-product';

export default (router: Router, rootDirectory, options) => {
    // Middleware for authentication or validation (placeholder)
    const authMiddleware = (req, res, next) => {
        // TODO: Implement authentication or validation logic
        next();
    };

    // Set up a POST route to sync products from StreamPay
    router.post("/products/sync", authMiddleware, wrapHandler(async (req, res) => {
        const mwProductService: StreamPayProductService = req.scope.resolve("streampayProductService");
        
        try {
            // Sync all products from StreamPay
            const result = await mwProductService.syncAllInventoryFromStreamPay();

            // Logging the syncing process
            console.log(`Synced ${result.length} products from StreamPay.`);

            // Send a detailed response
            res.json({ 
                success: true, 
                message: "Products synced successfully", 
                totalSynced: result.length 
            });
        } catch (error) {
            // Detailed error handling
            console.error("Error syncing products from StreamPay:", error.message);
            res.status(500).json({ 
                success: false, 
                message: "Failed to sync products", 
                error: error.message 
            });
        }
    }));
}
