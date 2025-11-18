import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for terminal basics endpoints
 */
export const terminalBasicsGroup: EndpointGroupMeta = {
  name: "terminal-basics",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Essential terminal details including identification, amenities, and regional assignments.",
    description:
      "Basic terminal information for Washington State Ferry terminals including IDs, names, abbreviations, amenities (overhead passenger loading, elevator, waiting room, food service, restrooms), and sort order. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal lists with basic identification and amenities.",
      "Plan ferry trips with accessibility and facility information.",
      "Filter terminals by region or amenities.",
    ],
  },
};
