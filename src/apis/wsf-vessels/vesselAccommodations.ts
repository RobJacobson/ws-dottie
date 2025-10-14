import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each VesselAccommodation item represents detailed information about vessel amenities including accessibility features (ADA restrooms, elevators), galley availability, restroom locations, and WiFi access. Data updates infrequently.";

export const vesselAccommodationsResource = {
  name: "vessel-accommodations",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselAccommodations",
      endpoint: "/vesselAccommodations",
      inputSchema: i.vesselAccommodationsSchema,
      outputSchema: z.array(o.vesselAccommodationsSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselAccommodation data for all vesselAccommodations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.VesselAccommodationsInput,
      o.VesselAccommodations[]
    >,
    byId: {
      function: "getVesselAccommodationsByVesselId",
      endpoint: "/vesselAccommodations/{VesselID}",
      inputSchema: i.vesselAccommodationsByIdSchema,
      outputSchema: o.vesselAccommodationsSchema,
      sampleParams: { VesselID: 65 },
      cacheStrategy: "STATIC",
      description: `Returns VesselAccommodation data for the vesselaccommodation with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.VesselAccommodationsByIdInput,
      o.VesselAccommodations
    >,
  },
};
