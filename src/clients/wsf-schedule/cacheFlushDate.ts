import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateParamsSchema = z.object({});

/** GetScheduleCacheFlushDate params type */
export type GetScheduleCacheFlushDateParams = z.infer<
  typeof getScheduleCacheFlushDateParamsSchema
>;

/** Endpoint definition for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleCacheFlushDate",
  endpoint: "/ferries/api/schedule/rest/cacheflushdate",
  inputSchema: getScheduleCacheFlushDateParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
