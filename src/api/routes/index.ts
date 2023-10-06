import express, { Router } from "express";
import adminRouter from "./routes/admin";
import storeRouter from "./routes/store";
import streampayRouter from "./routes/streampay";
import { errorHandler } from "@medusajs/medusa";

/**
 * Initializes the main Express router and mounts sub-routers.
 * @param {string} rootDirectory - The root directory of the project.
 * @param {object} options - Additional options for the router.
 * @returns {Router} - The initialized router with sub-routers and middleware applied.
 */
export default (rootDirectory, options) => {
    const router = Router();

    // Middleware for parsing request bodies
    router.use(express.json())
    router.use(express.urlencoded({ extended: true }))

    // Mount the admin and streampay sub-routers
    router.use("/admin/streampay", adminRouter(rootDirectory, options));
    router.use("/streampay", streampayRouter(rootDirectory, options));

    // Uncomment below if you want to use the storeRouter in the future
    // router.use("/store", storeRouter(rootDirectory, options));

    // Error handling middleware
    router.use(errorHandler());

    console.log("Main router initialized with sub-routers"); // Logging

    return router;
};
