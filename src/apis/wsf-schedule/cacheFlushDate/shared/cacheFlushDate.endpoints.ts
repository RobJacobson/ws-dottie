import type { EndpointGroupMeta } from "@/apis/types";
import { cacheFlushDateScheduleMeta } from "../cacheFlushDateSchedule";

/**
 * Endpoint group metadata for cache flush date endpoints
 */
export const cacheFlushDateScheduleGroup: EndpointGroupMeta = {
  name: "cache-flush-date-schedule",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for wsf-schedule static data.",
    description:
      "Timestamp indicating when static endpoint data for the wsf-schedule API was last updated. Use to determine when to invalidate cached schedule information.",
    useCases: [
      "Poll periodically to detect when static schedule data has changed.",
      "Invalidate application cache when timestamp changes.",
      "Optimize cache refresh strategy for schedule endpoints.",
    ],
    updateFrequency: "on-change",
  },
};

/**
 * Aggregated endpoint metadata for the cache flush date group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const cacheFlushDateScheduleEndpoints = {
  cacheFlushDateSchedule: cacheFlushDateScheduleMeta,
} as const;
