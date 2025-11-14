import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
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

export const vesselAccommodationsGroup = defineEndpointGroup({
  name: "vessel-accommodations",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each VesselAccommodation item represents passenger amenity and accessibility information for Washington State Ferries vessels. These items include ADA compliance features, restroom facilities, food service availability, and connectivity options for each vessel.",
    businessContext:
      "Use to plan accessible travel by providing amenity and accessibility information for passenger information applications. Supports trip planning tools and accessibility compliance systems for Washington State Ferry services.",
  },
});

export const fetchVesselAccommodations = defineEndpoint<
  VesselAccommodationsInput,
  VesselAccommodation[]
>({
  api: API,
  group: vesselAccommodationsGroup,
  functionName: "fetchVesselAccommodations",
  endpoint: "/vesselAccommodations",
  inputSchema: vesselAccommodationsInputSchema,
  outputSchema: vesselAccommodationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple VesselAccommodation objects for all vessels in the fleet.",
});

export const fetchVesselAccommodationsByVesselId = defineEndpoint<
  VesselAccommodationsByIdInput,
  VesselAccommodation
>({
  api: API,
  group: vesselAccommodationsGroup,
  functionName: "fetchVesselAccommodationsByVesselId",
  endpoint: "/vesselAccommodations/{VesselID}",
  inputSchema: vesselAccommodationsByIdInputSchema,
  outputSchema: vesselAccommodationSchema,
  sampleParams: { VesselID: 65 },
  endpointDescription:
    "Returns VesselAccommodation data for the vesselaccommodation with the given identifier.",
});
