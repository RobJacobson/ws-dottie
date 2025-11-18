import type { EndpointGroupMeta } from "@/apis/types";
import { vesselLocationsMeta } from "../vesselLocations";
import { vesselLocationsByVesselIdMeta } from "../vesselLocationsByVesselId";

/**
 * Endpoint group metadata for vessel locations endpoints
 */
export const vesselLocationsGroup: EndpointGroupMeta = {
  name: "vessel-locations",
  cacheStrategy: "REALTIME",
  documentation: {
    summary: "Real-time vessel positions and status for WSF fleet.",
    description:
      "Current GPS coordinates, speed, heading, terminal assignments, and ETAs. This endpoint is real-time; cacheFlushDate is not used for cache invalidation.",
    useCases: [
      "Show live vessel positions and ETAs in rider apps.",
      "Monitor fleet operations in internal dashboards.",
      "Calculate arrival times and voyage progress.",
    ],
    updateFrequency: "5s",
  },
};

/**
 * Aggregated endpoint metadata for the vessel locations group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const vesselLocationsEndpoints = {
  vesselLocations: vesselLocationsMeta,
  vesselLocationsByVesselId: vesselLocationsByVesselIdMeta,
} as const;

