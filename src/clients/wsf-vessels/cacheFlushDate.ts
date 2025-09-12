import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getCacheFlushDateVessels */
const getCacheFlushDateVesselsParamsSchema = z.object({});

/** GetCacheFlushDateVessels params type */

/** Endpoint definition for getCacheFlushDateVessels */
export const getCacheFlushDateVesselsDef = defineEndpoint({
  api: "wsf-vessels",
  function: "getCacheFlushDateVessels",
  endpoint: "/ferries/api/vessels/rest/cacheflushdate",
  inputSchema: getCacheFlushDateVesselsParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
