import type { EndpointGroupMeta } from "@/apis/types";
import { cacheFlushDateTerminalsMeta } from "../cacheFlushDateTerminals";

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
};

/**
 * Aggregated endpoint metadata for the cache flush date terminals group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const cacheFlushDateTerminalsEndpoints = {
  cacheFlushDateTerminals: cacheFlushDateTerminalsMeta,
} as const;
