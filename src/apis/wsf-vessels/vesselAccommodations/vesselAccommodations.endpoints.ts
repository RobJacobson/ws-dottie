import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations.input";
import {
  vesselAccommodationsByIdInputSchema,
  vesselAccommodationsInputSchema,
} from "./vesselAccommodations.input";
import type { VesselAccommodation } from "./vesselAccommodations.output";
import { vesselAccommodationSchema } from "./vesselAccommodations.output";

export const vesselAccommodationsGroup: EndpointGroup = {
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

export const fetchVesselAccommodations = createEndpoint<
  VesselAccommodationsInput,
  VesselAccommodation[]
>({
  api: apis.wsfVessels,
  group: vesselAccommodationsGroup,
  functionName: "fetchVesselAccommodations",
  endpoint: "/vesselAccommodations",
  inputSchema: vesselAccommodationsInputSchema,
  outputSchema: vesselAccommodationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List amenities and accessibility features for all vessels.",
});

export const fetchVesselAccommodationsByVesselId = createEndpoint<
  VesselAccommodationsByIdInput,
  VesselAccommodation
>({
  api: apis.wsfVessels,
  group: vesselAccommodationsGroup,
  functionName: "fetchVesselAccommodationsByVesselId",
  endpoint: "/vesselAccommodations/{VesselID}",
  inputSchema: vesselAccommodationsByIdInputSchema,
  outputSchema: vesselAccommodationSchema,
  sampleParams: { VesselID: 65 },
  endpointDescription:
    "Get amenities and accessibility features for a specific vessel.",
});
