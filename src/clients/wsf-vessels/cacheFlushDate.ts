import { z } from "zod";
import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getCacheFlushDateVessels */
const cacheFlushDateVesselsInput = z.object({});

/** Endpoint metadata for getCacheFlushDateVessels */
export const getCacheFlushDateVesselsMeta: Endpoint<
  CacheFlushDateVesselsInput,
  WsfStandardCacheFlushDate
> = {
  api: "wsf-vessels",
  function: "getCacheFlushDateVessels",
  endpoint: "/ferries/api/vessels/rest/cacheflushdate",
  inputSchema: cacheFlushDateVesselsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type CacheFlushDateVesselsInput = z.infer<
  typeof cacheFlushDateVesselsInput
>;
