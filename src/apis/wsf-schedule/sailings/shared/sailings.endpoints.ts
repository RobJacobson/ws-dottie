import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for sailings endpoints
 */
export const sailingsGroup: EndpointGroupMeta = {
  name: "sailings",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Scheduled ferry sailings organized by route and direction.",
    description:
      "Departure times organized by direction, days of operation, and date ranges, mirroring printed PDF schedule groupings.",
    useCases: [
      "Display schedule structure with sailing groups.",
      "Show departure times by direction and day type.",
      "Access journey details with vessel assignments and terminal stops.",
    ],
    updateFrequency: "daily",
  },
};
