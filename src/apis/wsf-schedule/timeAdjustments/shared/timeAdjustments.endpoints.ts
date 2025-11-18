import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for time adjustments endpoints
 */
export const timeAdjustmentsGroup: EndpointGroupMeta = {
  name: "time-adjustments",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Modifications to scheduled sailing times for specific dates.",
    description:
      "Time adjustments include additions, cancellations, and timing changes that deviate from published schedules, such as tidal cancellations. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display schedule deviations and special date modifications.",
      "Identify tidal adjustments and event-based cancellations.",
      "Show accurate sailing times that differ from published schedules.",
    ],
    updateFrequency: "daily",
  },
};
