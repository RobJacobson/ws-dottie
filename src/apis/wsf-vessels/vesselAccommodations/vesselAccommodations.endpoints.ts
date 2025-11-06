import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./vesselAccommodations.input";
import * as o from "./vesselAccommodations.output";

export const vesselAccommodationsResource = {
  name: "vessel-accommodations",
  documentation: {
    resourceDescription:
      "Each VesselAccommodation item represents passenger amenity and accessibility information for Washington State Ferries vessels. These items include ADA compliance features, restroom facilities, food service availability, and connectivity options for each vessel.",
    businessContext:
      "Use to plan accessible travel by providing amenity and accessibility information for passenger information applications. Supports trip planning tools and accessibility compliance systems for Washington State Ferry services.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselAccommodations: {
      function: "getVesselAccommodations",
      endpoint: "/vesselAccommodations",
      inputSchema: i.vesselAccommodationsSchema,
      outputSchema: z.array(o.vesselAccommodationsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselAccommodation objects for all vessels in fleet.",
    } satisfies EndpointDefinition<
      i.VesselAccommodationsInput,
      o.VesselAccommodations[]
    >,
    getVesselAccommodationsByVesselId: {
      function: "getVesselAccommodationsByVesselId",
      endpoint: "/vesselAccommodations/{VesselID}",
      inputSchema: i.vesselAccommodationsByIdSchema,
      outputSchema: o.vesselAccommodationsSchema,
      sampleParams: { VesselID: 65 },
      endpointDescription:
        "Returns VesselAccommodation data for the vesselaccommodation with the given identifier.",
    } satisfies EndpointDefinition<
      i.VesselAccommodationsByIdInput,
      o.VesselAccommodations
    >,
  },
} satisfies EndpointGroup;
