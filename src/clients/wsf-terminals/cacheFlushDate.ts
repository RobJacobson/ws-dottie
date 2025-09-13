import { z } from "zod";
import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getCacheFlushDateTerminals */
const cacheFlushDateTerminalsInput = z.object({});

/** Endpoint metadata for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsMeta: Endpoint<
  CacheFlushDateTerminalsInput,
  WsfStandardCacheFlushDate
> = {
  api: "wsf-terminals",
  function: "getCacheFlushDateTerminals",
  endpoint: "/ferries/api/terminals/rest/cacheflushdate",
  inputSchema: cacheFlushDateTerminalsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type CacheFlushDateTerminalsInput = z.infer<
  typeof cacheFlushDateTerminalsInput
>;
