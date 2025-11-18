import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for schedule today endpoints
 */
export const scheduleTodayGroup: EndpointGroupMeta = {
  name: "schedule-today",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Today's sailing schedule for ferry routes.",
    description:
      "Current day sailing information with option to show only remaining departures. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Show today's remaining sailings in real-time apps.",
      "Display current day schedule with all departures.",
      "Filter to only upcoming sailings for today.",
    ],
  },
};
