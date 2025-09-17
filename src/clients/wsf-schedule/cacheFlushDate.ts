import { z } from "zod";
import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getScheduleCacheFlushDate */
const scheduleCacheFlushDateInput = z.object({});

/** Endpoint metadata for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateMeta: EndpointDefinition<
  ScheduleCacheFlushDateInput,
  WsfStandardCacheFlushDate
> = {
  id: "wsf-schedule/cacheFlushDate",
  endpoint: "/ferries/api/schedule/rest/cacheflushdate",
  inputSchema: scheduleCacheFlushDateInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleCacheFlushDateInput = z.infer<
  typeof scheduleCacheFlushDateInput
>;
