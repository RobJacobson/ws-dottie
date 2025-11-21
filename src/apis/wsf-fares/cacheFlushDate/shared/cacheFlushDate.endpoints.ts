import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointGroupMeta, EndpointMeta } from "@/apis/types";

/**
 * Metadata for the cache flush date fares endpoint
 */
export const cacheFlushDateFaresMeta = {
  functionName: "fetchCacheFlushDateFares",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription: "Get cache flush timestamp for static fares data.",
} satisfies EndpointMeta<CacheFlushDateInput, CacheFlushDateOutput>;

/**
 * Endpoint group metadata for cache flush date fares endpoints
 */
export const cacheFlushDateFaresGroup: EndpointGroupMeta = {
  name: "cache-flush-date-fares",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for static WSF fares data.",
    description:
      "Returns the UTC datetime when static endpoint data for the wsf-fares API was last updated. Use this endpoint to determine when to invalidate cached fares information.",
    useCases: [
      "Poll periodically to detect when static fares data has changed.",
      "Invalidate application cache when the returned date changes.",
      "Coordinate cache refresh across multiple static endpoints.",
    ],
    updateFrequency: "daily",
  },
  endpoints: [cacheFlushDateFaresMeta],
};
