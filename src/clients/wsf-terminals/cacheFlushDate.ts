import { z } from "zod";

import type { WsfStandardCacheFlushDate } from "@/schemas/shared/cacheFlushDate.zod";
import { wsfStandardCacheFlushDateSchema } from "@/schemas/shared/cacheFlushDate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getCacheFlushDateTerminals */
const cacheFlushDateTerminalsInput = z.object({}).strict();

/** Endpoint metadata for getCacheFlushDateTerminals */
export const getCacheFlushDateTerminalsMeta: EndpointDefinition<
  CacheFlushDateTerminalsInput,
  WsfStandardCacheFlushDate
> = {
  id: "wsf-terminals:cacheFlushDate",
  endpoint: "/ferries/api/terminals/rest/cacheflushdate",
  inputSchema: cacheFlushDateTerminalsInput,
  outputSchema: wsfStandardCacheFlushDateSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type CacheFlushDateTerminalsInput = z.infer<
  typeof cacheFlushDateTerminalsInput
>;
