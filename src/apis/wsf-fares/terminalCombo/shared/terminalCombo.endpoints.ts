import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for terminal combo endpoints
 */
export const terminalComboGroup: EndpointGroupMeta = {
  name: "terminal-combo",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Valid terminal pairings with fare collection procedures for WSF routes.",
    description:
      "Terminal combinations define which terminals are connected and describe where and how fares are collected for each route. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Determine route availability between terminal pairs.",
      "Understand fare collection procedures for specific routes.",
      "Build journey planning interfaces with fare collection details.",
    ],
    updateFrequency: "daily",
  },
};
