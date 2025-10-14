import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each VesselVerbose item represents comprehensive vessel information combining all available data from basic details, accommodations, and specifications in a single response. Data updates infrequently.";

export const vesselVerboseResource = {
  name: "vessel-verbose",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselsVerbose",
      endpoint: "/vesselVerbose",
      inputSchema: i.vesselVerboseSchema,
      outputSchema: z.array(o.vesselVerboseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselVerbose data for all vesselVerboses. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselVerboseInput, o.VesselVerbose[]>,
    byId: {
      function: "getVesselsVerboseByVesselId",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: i.vesselVerboseByIdSchema,
      outputSchema: o.vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      cacheStrategy: "STATIC",
      description: `Returns VesselVerbose data for the vesselverbose with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselVerboseByIdInput, o.VesselVerbose>,
  },
};
