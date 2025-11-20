import type { EndpointGroupMeta, EndpointMeta } from "@/apis/types";
import {
  type CacheFlushDateInput,
  cacheFlushDateInputSchema,
} from "./cacheFlushDate.input";
import {
  type CacheFlushDateOutput,
  cacheFlushDateOutputSchema,
} from "./cacheFlushDate.output";

/**
 * Metadata for the cache flush date terminals endpoint
 */
export const cacheFlushDateTerminalsMeta = {
  functionName: "fetchCacheFlushDateTerminals",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription: "Get cache flush timestamp for static terminals data.",
} satisfies EndpointMeta<CacheFlushDateInput, CacheFlushDateOutput>;

/**
 * Endpoint group metadata for cache flush date terminals endpoints
 */
export const cacheFlushDateTerminalsGroup: EndpointGroupMeta = {
  name: "cache-flush-date-terminals",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for static wsf-terminals data.",
    description:
      "Timestamp indicating when static endpoint data for the wsf-terminals API was last updated. Use this endpoint to determine when to invalidate cached terminal information. When the returned date changes, refresh your cached data. Polled automatically by ws-dottie useQuery hooks.",
    useCases: [
      "Detect when static terminal data has changed and invalidate caches.",
      "Poll periodically to refresh cached terminal information.",
      "Coordinate cache invalidation across multiple terminal endpoints.",
    ],
  },
  endpoints: [cacheFlushDateTerminalsMeta],
};
