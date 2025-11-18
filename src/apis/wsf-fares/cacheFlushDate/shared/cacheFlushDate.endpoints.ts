import type { EndpointGroupMeta } from "@/apis/types";
import { cacheFlushDateFaresMeta } from "../cacheFlushDateFares";

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
};

/**
 * Aggregated endpoint metadata for the cache flush date fares group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const cacheFlushDateFaresEndpoints = {
  cacheFlushDateFares: cacheFlushDateFaresMeta,
} as const;

// Re-export with API-specific names for backward compatibility
import type {
  CacheFlushDateInput,
  CacheFlushDateOutput,
} from "@/apis/shared/cacheFlushDate";

export type CacheFlushDateFaresInput = CacheFlushDateInput;
export type CacheFlushDateFares = CacheFlushDateOutput;
