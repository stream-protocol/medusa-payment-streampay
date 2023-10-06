import { authenticate } from "@medusajs/medusa";
import { Router } from "express";
import streampayProductRouter from "./streampay-product";
import cors from "cors";
import { getConfigFile, parseCorsOrigins } from "medusa-core-utils";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";

export default (rootDirectory, options) => {
    // Retrieve the project's configuration
    const { configModule } = getConfigFile<ConfigModule>(
        rootDirectory,
        "medusa-config",
    );
    const { projectConfig } = configModule;

    // Set up CORS options for the admin
    const adminCorsOptions = {
        origin: projectConfig.admin_cors?.split(",") ?? [],
        credentials: true,
    };

    // Initialize a new Express router
    const router = Router();

    // Apply CORS and authentication middleware
    router.use(cors(adminCorsOptions));
    router.use(authenticate());

    // Use the streampayProductRouter for specific routes
    streampayProductRouter(router, rootDirectory, options);

    // Return the configured router
    return router;
};
