import type { EndpointGroupMeta } from "@/apis/types";
import { vesselAccommodationsMeta } from "../vesselAccommodations";
import { vesselAccommodationsByVesselIdMeta } from "../vesselAccommodationsByVesselId";

/**
 * Endpoint group metadata for vessel accommodations endpoints
 */
export const vesselAccommodationsGroup: EndpointGroupMeta = {
  name: "vessel-accommodations",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Passenger amenities and accessibility features for WSF vessels.",
    description:
      "Amenity and accessibility information including ADA compliance, restrooms, food service, elevators, and connectivity. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display vessel amenities in passenger information systems.",
      "Plan accessible travel for passengers with disabilities.",
      "Compare vessel features for trip planning.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the vessel accommodations group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const vesselAccommodationsEndpoints = {
  vesselAccommodations: vesselAccommodationsMeta,
  vesselAccommodationsByVesselId: vesselAccommodationsByVesselIdMeta,
} as const;
