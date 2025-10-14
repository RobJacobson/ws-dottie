import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const vesselVerboseResource = {
  name: "vessel-verbose",
  resourceDescription:
    "Each VesselVerbose item represents comprehensive vessel information combining all available data from basic details, accommodations, and specifications in a single response. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselsVerbose: {
      function: "getVesselsVerbose",
      endpoint: "/vesselVerbose",
      inputSchema: i.vesselVerboseSchema,
      outputSchema: z.array(o.vesselVerboseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of VesselVerbose data for all vesselVerboses.",
    } satisfies EndpointDefinition<i.VesselVerboseInput, o.VesselVerbose[]>,
    getVesselsVerboseByVesselId: {
      function: "getVesselsVerboseByVesselId",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: i.vesselVerboseByIdSchema,
      outputSchema: o.vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      endpointDescription:
        "Returns VesselVerbose data for the vesselverbose with the given identifier.",
    } satisfies EndpointDefinition<i.VesselVerboseByIdInput, o.VesselVerbose>,
  },
};
