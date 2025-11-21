import type { EndpointGroupMeta } from "@/apis/types";
import { commercialVehicleRestrictionsWithIdMeta } from "../commercialVehicleRestrictionsWithId";

/**
 * Endpoint group metadata for commercial vehicle restriction data with ID endpoints
 */
export const cvRestrictionDataWithIdGroup: EndpointGroupMeta = {
  name: "cv-restriction-data-with-id",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Commercial vehicle restrictions with unique identifiers for Washington State highways.",
    description:
      "Weight limits, height clearances, axle restrictions, and location details with unique tracking IDs for bridge and road restrictions statewide.",
    useCases: [
      "Track specific restrictions using unique identifiers.",
      "Monitor restriction changes over time.",
      "Manage permit requirements with ID-based lookups.",
    ],
    updateFrequency: "daily",
  },
  endpoints: [commercialVehicleRestrictionsWithIdMeta],
};
