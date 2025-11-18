import type { EndpointGroupMeta } from "@/apis/types";
import { routesByTripDateMeta } from "../routesByTripDate";
import { routesByTripDateAndTerminalsMeta } from "../routesByTripDateAndTerminals";

/**
 * Endpoint group metadata for routes endpoints
 */
export const routesGroup: EndpointGroupMeta = {
  name: "routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Basic ferry route information between terminals.",
    description:
      "Route identification including route IDs, abbreviations, descriptions, region associations, and service disruptions.",
    useCases: [
      "Discover available routes for a trip date.",
      "Identify routes by terminal combinations.",
      "Check for active service disruptions on routes.",
    ],
    updateFrequency: "daily",
  },
};

/**
 * Aggregated endpoint metadata for the routes group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const routesEndpoints = {
  routesByTripDate: routesByTripDateMeta,
  routesByTripDateAndTerminals: routesByTripDateAndTerminalsMeta,
} as const;
