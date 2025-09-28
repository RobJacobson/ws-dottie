import { z } from "zod";

import type { WsfScheduleCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfScheduleCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getScheduleCacheFlushDate */
const scheduleCacheFlushDateInput = z.object({}).strict();

/** Endpoint metadata for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateMeta: EndpointDefinition<
  ScheduleCacheFlushDateInput,
  WsfScheduleCacheFlushDate
> = {
  api: "wsf-schedule",
  function: "cacheFlushDate",
  endpoint: "/ferries/api/schedule/rest/cacheflushdate",
  inputSchema: scheduleCacheFlushDateInput,
  outputSchema: wsfScheduleCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleCacheFlushDateInput = z.infer<
  typeof scheduleCacheFlushDateInput
>;
