import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./vesselVerbose.input";
import * as o from "./vesselVerbose.output";

export const vesselVerboseResource = {
  name: "vessel-verbose",
  documentation: {
    resourceDescription:
      "Each VesselVerbose item represents complete vessel information combining basic details, technical specifications, and accommodation data. These items provide comprehensive vessel profiles in a single response for Washington State Ferries fleet.",
    businessContext:
      "Use to display complete vessel information by providing comprehensive vessel data for passenger information applications. Supports trip planning tools and fleet management systems for Washington State Ferry services.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselsVerbose: {
      function: "getVesselsVerbose",
      endpoint: "/vesselVerbose",
      inputSchema: i.vesselVerboseInputSchema,
      outputSchema: z.array(o.vesselVerboseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselVerbose objects for all vessels in fleet.",
    } satisfies EndpointDefinition<i.VesselVerboseInput, o.VesselVerbose[]>,
    getVesselsVerboseByVesselId: {
      function: "getVesselsVerboseByVesselId",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: i.vesselVerboseByIdInputSchema,
      outputSchema: o.vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      endpointDescription:
        "Returns a single VesselVerbose object for the specified vessel identifier.",
    } satisfies EndpointDefinition<i.VesselVerboseByIdInput, o.VesselVerbose>,
  },
} satisfies EndpointGroup;
