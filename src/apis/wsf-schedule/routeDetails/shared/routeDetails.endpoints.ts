import type { EndpointGroupMeta } from "@/apis/types";
import { routeDetailsByTripDateMeta } from "../routeDetailsByTripDate";
import { routeDetailsByTripDateAndRouteIdMeta } from "../routeDetailsByTripDateAndRouteId";
import { routeDetailsByTripDateAndTerminalsMeta } from "../routeDetailsByTripDateAndTerminals";

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

/**
 * Aggregated endpoint metadata for the route details group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const routeDetailsEndpoints = {
  routeDetailsByTripDate: routeDetailsByTripDateMeta,
  routeDetailsByTripDateAndRouteId: routeDetailsByTripDateAndRouteIdMeta,
  routeDetailsByTripDateAndTerminals: routeDetailsByTripDateAndTerminalsMeta,
} as const;
