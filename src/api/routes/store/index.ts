import { Router } from "express";
import cors from "cors";
import { getConfigFile, parseCorsOrigins } from "medusa-core-utils";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";

/**
 * Initializes an Express router and applies CORS middleware based on the Medusa configuration.
 * @param {string} rootDirectory - The root directory of the project.
 * @param {object} options - Additional options for the router.
 * @returns {Router} - The initialized router with CORS middleware applied.
 */
export default (rootDirectory, options) => {
    const router = Router();
    
    // Fetch the Medusa configuration
    const { configModule } = getConfigFile<ConfigModule>(
        rootDirectory,
        "medusa-config",
    );
    const { projectConfig } = configModule;

    // Set up CORS options based on the Medusa configuration
    const storeCorsOptions = {
        origin: projectConfig.store_cors?.split(",") ?? [],
        credentials: true,
    };

    // Apply CORS middleware to the router
    router.use(cors(storeCorsOptions));

    console.log("Initialized router with CORS options:", storeCorsOptions); // Logging

    return router;
};
