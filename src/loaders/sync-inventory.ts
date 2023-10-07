import { AwilixContainer } from "awilix";
import { optionsSchema } from "../lib/options";
import StreamPayProductService from '../services/streampay-product';

const syncInventory = async (
  container: AwilixContainer,
  options: Record<string, any>,
) => {
  const parsedOptions = optionsSchema.parse(options);
  if (parsedOptions.scheduledSyncString === null) {
    return;
  }
  const jobSchedulerService = container.resolve("jobSchedulerService");
  jobSchedulerService.create(
    "sync-streampay-inventory",
    {},
    parsedOptions.scheduledSyncString,
    async () => {
      const mwProductService: StreamPayProductService = container.resolve("StreamPayProductService");
      await mwProductService.syncAllInventoryFromStreamPay();
    },
  );
};

export default syncInventory;