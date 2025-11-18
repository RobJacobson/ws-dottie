import type { EndpointGroupMeta } from "@/apis/types";
import { vesselStatsMeta } from "../vesselStats";
import { vesselStatsByVesselIdMeta } from "../vesselStatsByVesselId";

/**
 * Endpoint group metadata for vessel stats endpoints
 */
export const vesselStatsGroup: EndpointGroupMeta = {
  name: "vessel-stats",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Technical specifications and capacity data for WSF vessels.",
    description:
      "Physical dimensions, engine details, passenger and vehicle capacity, and construction information. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Compare vessel capabilities and specifications.",
      "Plan capacity and route assignments.",
      "Support maintenance and technical reference.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the vessel stats group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const vesselStatsEndpoints = {
  vesselStats: vesselStatsMeta,
  vesselStatsByVesselId: vesselStatsByVesselIdMeta,
} as const;
