import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  VesselVerboseByIdInput,
  VesselVerboseInput,
} from "./vesselVerbose.input";
import {
  vesselVerboseByIdInputSchema,
  vesselVerboseInputSchema,
} from "./vesselVerbose.input";
import type { VesselVerbose } from "./vesselVerbose.output";
import { vesselVerboseSchema } from "./vesselVerbose.output";

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
      inputSchema: vesselVerboseInputSchema,
      outputSchema: z.array(vesselVerboseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselVerbose objects for all vessels in fleet.",
    } satisfies EndpointDefinition<VesselVerboseInput, VesselVerbose[]>,
    getVesselsVerboseByVesselId: {
      function: "getVesselsVerboseByVesselId",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: vesselVerboseByIdInputSchema,
      outputSchema: vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      endpointDescription:
        "Returns a single VesselVerbose object for the specified vessel identifier.",
    } satisfies EndpointDefinition<VesselVerboseByIdInput, VesselVerbose>,
  },
} satisfies EndpointGroup;
