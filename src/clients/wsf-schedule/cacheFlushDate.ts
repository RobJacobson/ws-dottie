import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleCacheFlushDate */
const getScheduleCacheFlushDateParamsSchema = z.object({});

/** GetScheduleCacheFlushDate params type */

/** Endpoint definition for getScheduleCacheFlushDate */
export const getScheduleCacheFlushDateDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleCacheFlushDate",
  endpoint: "/ferries/api/schedule/rest/cacheflushdate",
  inputSchema: getScheduleCacheFlushDateParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
