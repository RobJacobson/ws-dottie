import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
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

export const vesselVerboseGroup: EndpointGroup = {
  name: "vessel-verbose",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Complete vessel information combining basics, stats, and accommodations.",
    description:
      "Comprehensive vessel profiles combining identification, operational status, technical specifications, and amenities in a single response. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display complete vessel profiles in passenger information systems.",
      "Reduce API calls by fetching all vessel data at once.",
      "Support comprehensive vessel comparison and selection.",
    ],
  },
};

export const fetchVesselsVerbose = createEndpoint<
  VesselVerboseInput,
  VesselVerbose[]
>({
  api: apis.wsfVessels,
  group: vesselVerboseGroup,
  functionName: "fetchVesselsVerbose",
  endpoint: "/vesselVerbose",
  inputSchema: vesselVerboseInputSchema,
  outputSchema: vesselVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List complete vessel information for all vessels.",
});

export const fetchVesselsVerboseByVesselId = createEndpoint<
  VesselVerboseByIdInput,
  VesselVerbose
>({
  api: apis.wsfVessels,
  group: vesselVerboseGroup,
  functionName: "fetchVesselsVerboseByVesselId",
  endpoint: "/vesselVerbose/{VesselID}",
  inputSchema: vesselVerboseByIdInputSchema,
  outputSchema: vesselVerboseSchema,
  sampleParams: { VesselID: 68 },
  endpointDescription:
    "Get complete vessel information for a specific vessel by ID.",
});
