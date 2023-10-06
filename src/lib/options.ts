import { z } from "zod";

/**
 * Schema to validate and infer the types of the options.
 */
export const optionsSchema = z.object({
    host: z.string(), // Hostname or IP address
    port: z.coerce.number().optional(), // Port number (optional)
    username: z.string().optional(), // Username for authentication (optional)
    password: z.string().optional(), // Password for authentication (optional)
    dataFile: z.string(), // Path or name of the data file
    dataFileUsername: z.string().optional(), // Username for the data file (optional)
    dataFilePassword: z.string().optional(), // Password for the data file (optional)
    scheduledSyncString: z.string().default("0 0 2 ? * * *").or(z.null()), // Cron-like schedule string (optional with default)
    streampaySecret: z.string().optional(), // Secret key for StreamPay (optional)
    invoiceForm: z.string().optional(), // Invoice form or template (optional)
});

/**
 * TypeScript type inferred from the options schema.
 */
export type Options = z.infer<typeof optionsSchema>;
