import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for schedule terminals endpoints
 */
export const scheduleTerminalsGroup: EndpointGroupMeta = {
  name: "schedule-terminals",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Ferry terminal facilities serving as departure and arrival points.",
    description:
      "Terminals represent dock locations where passengers board and disembark. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal options for trip planning interfaces.",
      "Determine valid terminal pairs for route selection.",
      "Build terminal lookup and navigation features.",
    ],
    updateFrequency: "daily",
  },
};
