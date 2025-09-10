import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getFaresCacheFlushDate */
export const getFaresCacheFlushDateParamsSchema = z.object({});

/** GetFaresCacheFlushDate params type */
export type GetFaresCacheFlushDateParams = z.infer<
  typeof getFaresCacheFlushDateParamsSchema
>;

/** Endpoint definition for getFaresCacheFlushDate */
export const getFaresCacheFlushDateDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFaresCacheFlushDate",
  endpoint: "/ferries/api/fares/rest/cacheflushdate",
  inputSchema: getFaresCacheFlushDateParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
