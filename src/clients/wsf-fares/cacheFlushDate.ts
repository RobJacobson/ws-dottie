import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getFaresCacheFlushDate */
const getFaresCacheFlushDateParamsSchema = z.object({});

/** GetFaresCacheFlushDate params type */

/** Endpoint definition for getFaresCacheFlushDate */
export const getFaresCacheFlushDateDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFaresCacheFlushDate",
  endpoint: "/ferries/api/fares/rest/cacheflushdate",
  inputSchema: getFaresCacheFlushDateParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
