import type { EndpointGroupMeta } from "@/apis/types";
import { commercialVehicleRestrictionsMeta } from "../commercialVehicleRestrictions";

/**
 * Endpoint group metadata for commercial vehicle restriction data endpoints
 */
export const cvRestrictionDataGroup: EndpointGroupMeta = {
  name: "cv-restriction-data",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Commercial vehicle restrictions for Washington State highways.",
    description:
      "Weight limits, height clearances, axle restrictions, and location details for bridge and road restrictions statewide.",
    useCases: [
      "Check vehicle restrictions for commercial route planning.",
      "Determine route feasibility and permit requirements.",
      "Identify weight and height limitations for trucking operations.",
    ],
    updateFrequency: "daily",
  },
  endpoints: [commercialVehicleRestrictionsMeta],
};
