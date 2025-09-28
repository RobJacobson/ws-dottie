import { z } from "zod";

import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getCacheFlushDateVessels */
const cacheFlushDateVesselsInput = z.object({}).strict();

/** Endpoint metadata for getCacheFlushDateVessels */
export const getCacheFlushDateVesselsMeta: EndpointDefinition<
  CacheFlushDateVesselsInput,
  WsfStandardCacheFlushDate
> = {
  api: "wsf-vessels",
  function: "cacheFlushDate",
  endpoint: "/ferries/api/vessels/rest/cacheflushdate",
  inputSchema: cacheFlushDateVesselsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type CacheFlushDateVesselsInput = z.infer<
  typeof cacheFlushDateVesselsInput
>;
