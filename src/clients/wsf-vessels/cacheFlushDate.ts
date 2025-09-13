import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getCacheFlushDateVessels */
const cacheFlushDateVesselsInput = z.object({});

/** Endpoint metadata for getCacheFlushDateVessels */
export const getCacheFlushDateVesselsMeta = defineEndpoint({
  api: "wsf-vessels",
  function: "getCacheFlushDateVessels",
  endpoint: "/ferries/api/vessels/rest/cacheflushdate",
  inputSchema: cacheFlushDateVesselsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type CacheFlushDateVesselsInput = z.infer<
  typeof cacheFlushDateVesselsInput
>;
