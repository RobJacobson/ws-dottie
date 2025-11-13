import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfVesselsApi } from "../apiDefinition";
import {
  vesselAccommodationsByIdInputSchema,
  vesselAccommodationsInputSchema,
} from "./vesselAccommodations.input";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations.input";
import type { VesselAccommodation } from "./vesselAccommodations.output";
import { vesselAccommodationSchema } from "./vesselAccommodations.output";

const group = defineEndpointGroup({
  api: wsfVesselsApi,
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
  group,
  functionName: "fetchVesselAccommodations",
  definition: {
    endpoint: "/vesselAccommodations",
    inputSchema: vesselAccommodationsInputSchema,
    outputSchema: vesselAccommodationSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple VesselAccommodation objects for all vessels in fleet.",
  },
});

export const fetchVesselAccommodationsByVesselId = defineEndpoint<
  VesselAccommodationsByIdInput,
  VesselAccommodation
>({
  group,
  functionName: "fetchVesselAccommodationsByVesselId",
  definition: {
    endpoint: "/vesselAccommodations/{VesselID}",
    inputSchema: vesselAccommodationsByIdInputSchema,
    outputSchema: vesselAccommodationSchema,
    sampleParams: { VesselID: 65 },
    endpointDescription:
      "Returns VesselAccommodation data for the vesselaccommodation with the given identifier.",
  },
});

export const vesselAccommodationsResource = group.descriptor;
