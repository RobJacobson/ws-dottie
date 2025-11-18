import type { EndpointGroupMeta } from "@/apis/types";
import { cacheFlushDateVesselsMeta } from "../cacheFlushDateVessels";

/**
 * Endpoint group metadata for cache flush date endpoints
 */
export const cacheFlushDateVesselsGroup: EndpointGroupMeta = {
  name: "cache-flush-date-vessels",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for static wsf-vessels data.",
    description:
      "Timestamp indicating when any static endpoint data for the wsf-vessels API was last updated. Use this endpoint to determine when to invalidate cached vessel information. When the returned date changes, refresh cached data from static endpoints.",
    useCases: [
      "Poll periodically to detect when static vessel data has changed.",
      "Invalidate application cache when timestamp changes.",
      "Coordinate cache refresh across multiple static endpoints.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the cache flush date group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const cacheFlushDateVesselsEndpoints = {
  cacheFlushDateVessels: cacheFlushDateVesselsMeta,
} as const;
