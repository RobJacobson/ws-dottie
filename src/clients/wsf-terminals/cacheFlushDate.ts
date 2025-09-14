import { z } from "zod";
import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getCacheFlushDateTerminals */
const cacheFlushDateTerminalsInput = z.object({});

/** Endpoint metadata for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsMeta: EndpointMeta<
  CacheFlushDateTerminalsInput,
  WsfStandardCacheFlushDate
> = {
  id: "wsf-terminals/cacheFlushDate",
  endpoint: "/ferries/api/terminals/rest/cacheflushdate",
  inputSchema: cacheFlushDateTerminalsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type CacheFlushDateTerminalsInput = z.infer<
  typeof cacheFlushDateTerminalsInput
>;
