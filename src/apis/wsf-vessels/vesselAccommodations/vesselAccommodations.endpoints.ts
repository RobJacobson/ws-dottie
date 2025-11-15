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
    resourceDescription:
      "Each VesselAccommodation item represents passenger amenity and accessibility information for Washington State Ferries vessels. These items include ADA compliance features, restroom facilities, food service availability, and connectivity options for each vessel.",
    businessContext:
      "Use to plan accessible travel by providing amenity and accessibility information for passenger information applications. Supports trip planning tools and accessibility compliance systems for Washington State Ferry services.",
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
    "Returns multiple VesselAccommodation objects for all vessels in the fleet.",
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
    "Returns VesselAccommodation data for the vesselaccommodation with the given identifier.",
});
