import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for route details endpoints
 */
export const routeDetailsGroup: EndpointGroupMeta = {
  name: "route-details",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Detailed ferry route information with service details.",
    description:
      "Comprehensive route data including terminals, crossing times, vessel assignments, alerts, and route-specific notes for trip planning.",
    useCases: [
      "Display detailed route information for trip planning.",
      "Show route alerts and service disruptions.",
      "Access route-specific notes and accessibility information.",
    ],
    updateFrequency: "daily",
  },
};
