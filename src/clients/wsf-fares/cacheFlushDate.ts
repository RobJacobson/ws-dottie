import { z } from "zod";

import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getFaresCacheFlushDate */
const faresCacheFlushDateInput = z.object({}).strict();

/** Endpoint metadata for getFaresCacheFlushDate */
export const getFaresCacheFlushDateMeta: EndpointDefinition<
  FaresCacheFlushDateInput,
  WsfStandardCacheFlushDate
> = {
  api: "wsf-fares",
  function: "cacheFlushDate",
  endpoint: "/ferries/api/fares/rest/cacheflushdate",
  inputSchema: faresCacheFlushDateInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type FaresCacheFlushDateInput = z.infer<typeof faresCacheFlushDateInput>;
