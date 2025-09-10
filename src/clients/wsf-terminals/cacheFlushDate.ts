import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsParamsSchema = z.object({});

/** GetCacheFlushDateTerminals params type */
export type GetCacheFlushDateTerminalsParams = z.infer<
  typeof getCacheFlushDateTerminalsParamsSchema
>;

/** Endpoint definition for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-terminals",
  functionName: "getCacheFlushDateTerminals",
  endpoint: "/ferries/api/terminals/rest/cacheflushdate",
  inputSchema: getCacheFlushDateTerminalsParamsSchema,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
