import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const vesselBasicsResource = {
  name: "vessel-basics",
  resourceDescription:
    "Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselBasics: {
      function: "getVesselBasics",
      endpoint: "/vesselBasics",
      inputSchema: i.vesselBasicsSchema,
      outputSchema: z.array(o.vesselBasicSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of VesselBasic data for all vesselBasics.",
    } satisfies EndpointDefinition<i.VesselBasicsInput, o.VesselBasic[]>,
    getVesselBasicsByVesselId: {
      function: "getVesselBasicsByVesselId",
      endpoint: "/vesselBasics/{VesselID}",
      inputSchema: i.vesselBasicsByIdSchema,
      outputSchema: o.vesselBasicSchema,
      sampleParams: { VesselID: 74 },
      endpointDescription:
        "Returns VesselBasic data for the vesselbasic with the given identifier.",
    } satisfies EndpointDefinition<i.VesselBasicsByIdInput, o.VesselBasic>,
  },
};
