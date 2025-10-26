import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./vesselAccommodations.input";
import * as o from "./vesselAccommodations.output";

export const vesselAccommodationsResource: EndpointGroup = {
  name: "vessel-accommodations",
  documentation: {
    resourceDescription:
      "Each VesselAccommodation item represents detailed information about vessel amenities including accessibility features (ADA restrooms, elevators), galley availability, restroom locations, and WiFi access.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
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
