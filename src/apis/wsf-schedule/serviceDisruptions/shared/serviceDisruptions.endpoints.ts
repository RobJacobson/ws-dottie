import type { EndpointGroupMeta } from "@/apis/types";
import { routesHavingServiceDisruptionsByTripDateMeta } from "../routesHavingServiceDisruptionsByTripDate";

/**
 * Endpoint group metadata for service disruptions endpoints
 */
export const serviceDisruptionsGroup: EndpointGroupMeta = {
  name: "service-disruptions",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Service disruptions affecting ferry routes.",
    description:
      "Planned or unplanned interruptions to normal ferry service including cancellations, delays, and route changes. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Identify routes with service disruptions for a specific date.",
      "Plan alternative travel arrangements when disruptions occur.",
      "Display disruption information to passengers.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the service disruptions group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const serviceDisruptionsEndpoints = {
  routesHavingServiceDisruptionsByTripDate:
    routesHavingServiceDisruptionsByTripDateMeta,
} as const;
