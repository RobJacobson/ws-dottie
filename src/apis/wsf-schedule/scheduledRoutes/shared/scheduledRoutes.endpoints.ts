import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for scheduled routes endpoints
 */
export const scheduledRoutesGroup: EndpointGroupMeta = {
  name: "scheduled-routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Ferry routes active for specific schedule seasons.",
    description:
      "Predefined routes with schedule identifiers, contingency adjustments, and service disruptions. Routes must be scheduled to run during a season to be included. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Discover routes active for a specific schedule season.",
      "Filter routes by season using schedule IDs.",
      "Identify contingency routes and service disruptions.",
    ],
  },
};
