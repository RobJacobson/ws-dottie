import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getCacheFlushDateTerminals */
const getCacheFlushDateTerminalsParamsSchema = z.object({});

/** GetCacheFlushDateTerminals params type */

/** Endpoint definition for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsDef = defineEndpoint({
  api: "wsf-terminals",
  function: "getCacheFlushDateTerminals",
  endpoint: "/ferries/api/terminals/rest/cacheflushdate",
  inputSchema: getCacheFlushDateTerminalsParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
