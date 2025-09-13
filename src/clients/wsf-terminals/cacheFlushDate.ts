import { z } from "zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";

/** Input schema for getCacheFlushDateTerminals */
const cacheFlushDateTerminalsInput = z.object({});

/** Endpoint metadata for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsMeta = {
  api: "wsf-terminals",
  function: "getCacheFlushDateTerminals",
  endpoint: "/ferries/api/terminals/rest/cacheflushdate",
  inputSchema: cacheFlushDateTerminalsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type CacheFlushDateTerminalsInput = z.infer<
  typeof cacheFlushDateTerminalsInput
>;
