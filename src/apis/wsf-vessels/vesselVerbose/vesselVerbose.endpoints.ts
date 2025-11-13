import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfVesselsApi } from "../apiDefinition";
import {
  type VesselVerboseByIdInput,
  type VesselVerboseInput,
  vesselVerboseByIdInputSchema,
  vesselVerboseInputSchema,
} from "./vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./vesselVerbose.output";

const group = defineEndpointGroup({
  api: wsfVesselsApi,
  name: "vessel-verbose",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each VesselVerbose item represents complete vessel information combining basic details, technical specifications, and accommodation data. These items provide comprehensive vessel profiles in a single response for Washington State Ferries fleet.",
    businessContext:
      "Use to display complete vessel information by providing comprehensive vessel data for passenger information applications. Supports trip planning tools and fleet management systems for Washington State Ferry services.",
  },
});

export const fetchVesselsVerbose = defineEndpoint<
  VesselVerboseInput,
  VesselVerbose[]
>({
  group,
  functionName: "fetchVesselsVerbose",
  definition: {
    endpoint: "/vesselVerbose",
    inputSchema: vesselVerboseInputSchema,
    outputSchema: vesselVerboseSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple VesselVerbose objects for all vessels in fleet.",
  },
});

export const fetchVesselsVerboseByVesselId = defineEndpoint<
  VesselVerboseByIdInput,
  VesselVerbose
>({
  group,
  functionName: "fetchVesselsVerboseByVesselId",
  definition: {
    endpoint: "/vesselVerbose/{VesselID}",
    inputSchema: vesselVerboseByIdInputSchema,
    outputSchema: vesselVerboseSchema,
    sampleParams: { VesselID: 68 },
    endpointDescription:
      "Returns a single VesselVerbose object for the specified vessel identifier.",
  },
});

export const vesselVerboseResource = group.descriptor;
