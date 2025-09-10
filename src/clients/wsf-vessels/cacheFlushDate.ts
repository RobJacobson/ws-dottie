import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getCacheFlushDateVessels */
export const getCacheFlushDateVesselsParamsSchema = z.object({});

/** GetCacheFlushDateVessels params type */
export type GetCacheFlushDateVesselsParams = z.infer<
  typeof getCacheFlushDateVesselsParamsSchema
>;

/** Endpoint definition for getCacheFlushDateVessels */
export const getCacheFlushDateVesselsDef = defineEndpoint({
  moduleGroup: "wsf-vessels",
  functionName: "getCacheFlushDateVessels",
  endpoint: "/ferries/api/vessels/rest/cacheflushdate",
  inputSchema: getCacheFlushDateVesselsParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
