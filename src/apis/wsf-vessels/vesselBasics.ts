import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.";

export const vesselBasicsResource = {
  name: "vessel-basics",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselBasics",
      endpoint: "/vesselBasics",
      inputSchema: i.vesselBasicsSchema,
      outputSchema: z.array(o.vesselBasicSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselBasic data for all vesselBasics. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselBasicsInput, o.VesselBasic[]>,
    byId: {
      function: "getVesselBasicsByVesselId",
      endpoint: "/vesselBasics/{VesselID}",
      inputSchema: i.vesselBasicsByIdSchema,
      outputSchema: o.vesselBasicSchema,
      sampleParams: { VesselID: 74 },
      cacheStrategy: "STATIC",
      description: `Returns VesselBasic data for the vesselbasic with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselBasicsByIdInput, o.VesselBasic>,
  },
};
