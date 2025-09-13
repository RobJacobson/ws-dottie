import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduleCacheFlushDate */
const scheduleCacheFlushDateInput = z.object({});

/** Endpoint metadata for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleCacheFlushDate",
  endpoint: "/ferries/api/schedule/rest/cacheflushdate",
  inputSchema: scheduleCacheFlushDateInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduleCacheFlushDateInput = z.infer<
  typeof scheduleCacheFlushDateInput
>;
