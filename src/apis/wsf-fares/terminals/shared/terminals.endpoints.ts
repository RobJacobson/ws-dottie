import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for terminals endpoints
 */
export const terminalsGroup: EndpointGroupMeta = {
  name: "terminals",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "WSF terminal facilities serving as departure and arrival points for ferry routes.",
    description:
      "Terminals represent port facilities with unique identifiers and names. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal options for trip planning interfaces.",
      "Determine valid terminal pairs for route selection.",
      "Build terminal lookup and navigation features.",
    ],
    updateFrequency: "daily",
  },
};
