import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for schedule terminal mates endpoints
 */
export const scheduleTerminalMatesGroup: EndpointGroupMeta = {
  name: "schedule-terminal-mates",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Arriving terminals that can be reached from a given departing terminal.",
    description:
      "Terminal mates represent valid destination terminals for a specific origin terminal and trip date. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Find valid destination terminals for trip planning interfaces.",
      "Build terminal selection workflows for route queries.",
      "Determine available terminal pairs for schedule lookups.",
    ],
    updateFrequency: "daily",
  },
};
