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
  toolDescription: {
    purpose:
      "Get timestamp indicating when static terminal data was last updated for cache invalidation.",
    useWhen: [
      "detecting when terminal data has changed",
      "implementing cache invalidation strategies",
      "polling for terminal data updates",
    ],
    inputsHighlights: "none",
    returns: "string — UTC timestamp when terminal data was last updated",
    outputHighlights: [
      "Timestamp in ISO 8601 format indicating last update time",
      "Returns undefined if no update has occurred",
      "Used to determine when cached terminal information should be refreshed",
    ],
    chaining: [
      "fetchCacheFlushDateTerminals → compare with cached timestamp → call terminal bulk endpoints if changed",
    ],
  },
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
