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
  endpoints: [vesselAccommodationsMeta, vesselAccommodationsByVesselIdMeta],
};
