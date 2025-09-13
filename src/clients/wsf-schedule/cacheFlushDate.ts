import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";

/** Input schema for getScheduleCacheFlushDate */
const scheduleCacheFlushDateInput = z.object({});

/** Endpoint metadata for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateMeta = {
  api: "wsf-schedule",
  function: "getScheduleCacheFlushDate",
  endpoint: "/ferries/api/schedule/rest/cacheflushdate",
  inputSchema: scheduleCacheFlushDateInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type ScheduleCacheFlushDateInput = z.infer<
  typeof scheduleCacheFlushDateInput
>;
