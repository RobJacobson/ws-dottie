import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const vesselAccommodationsResource = {
  name: "vessel-accommodations",
  resourceDescription:
    "Each VesselAccommodation item represents detailed information about vessel amenities including accessibility features (ADA restrooms, elevators), galley availability, restroom locations, and WiFi access. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselAccommodations: {
      function: "getVesselAccommodations",
      endpoint: "/vesselAccommodations",
      inputSchema: i.vesselAccommodationsSchema,
      outputSchema: z.array(o.vesselAccommodationsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of VesselAccommodation data for all vesselAccommodations.",
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
};
