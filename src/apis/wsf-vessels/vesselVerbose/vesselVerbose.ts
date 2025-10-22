import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./vesselVerbose.input";
import * as o from "./vesselVerbose.output";

export const vesselVerboseResource: EndpointGroup = {
  name: "vessel-verbose",
  documentation: {
    resourceDescription:
      "Each VesselVerbose item represents comprehensive vessel information combining all available data from basic details, accommodations, and specifications in a single response. Data updates infrequently.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
