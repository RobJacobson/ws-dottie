import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointGroupMeta, EndpointMeta } from "@/apis/types";

/**
 * Metadata for the cache flush date schedule endpoint
 */
export const cacheFlushDateScheduleMeta = {
  functionName: "fetchCacheFlushDateSchedule",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription: "Get cache flush timestamp for static schedule data.",
  toolDescription: {
    purpose:
      "Get the timestamp when static schedule data was last updated for cache invalidation.",
    useWhen: [
      "detecting when schedule data has changed",
      "implementing cache invalidation strategies",
      "optimizing data refresh timing",
    ],
    inputs: [],
    returns: "string — UTC timestamp or null",
    outputHighlights: [
      "Timestamp: UTC datetime string when static schedule data was last updated",
      "Null handling: returns null if no update has occurred",
    ],
  },
} satisfies EndpointMeta<CacheFlushDateInput, CacheFlushDateOutput>;

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
  endpoints: [cacheFlushDateScheduleMeta],
};
