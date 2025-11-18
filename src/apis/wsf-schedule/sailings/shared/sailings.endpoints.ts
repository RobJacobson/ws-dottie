import type { EndpointGroupMeta } from "@/apis/types";
import { allSailingsBySchedRouteIDMeta } from "../allSailingsBySchedRouteID";
import { sailingsByRouteIDMeta } from "../sailingsByRouteID";

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

/**
 * Aggregated endpoint metadata for the sailings group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const sailingsEndpoints = {
  allSailingsBySchedRouteID: allSailingsBySchedRouteIDMeta,
  sailingsByRouteID: sailingsByRouteIDMeta,
} as const;
