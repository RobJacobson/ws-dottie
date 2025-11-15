import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  type VesselBasicsByIdInput,
  type VesselBasicsInput,
  vesselBasicsByIdInputSchema,
  vesselBasicsInputSchema,
} from "./vesselBasics.input";
import { type VesselBasic, vesselBasicSchema } from "./vesselBasics.output";

export const vesselBasicsGroup: EndpointGroup = {
  name: "vessel-basics",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Essential vessel identification and operational status.",
    description:
      "Basic vessel information including names, IDs, classifications, and operational status. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display vessel lists and status in passenger information systems.",
      "Track fleet operational status and availability.",
      "Provide foundation data for vessel selection.",
    ],
  },
};

export const fetchVesselBasics = createEndpoint<
  VesselBasicsInput,
  VesselBasic[]
>({
  api: apis.wsfVessels,
  group: vesselBasicsGroup,
  functionName: "fetchVesselBasics",
  endpoint: "/vesselBasics",
  inputSchema: vesselBasicsInputSchema,
  outputSchema: vesselBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all vessels in the fleet.",
});

export const fetchVesselBasicsByVesselId = createEndpoint<
  VesselBasicsByIdInput,
  VesselBasic
>({
  api: apis.wsfVessels,
  group: vesselBasicsGroup,
  functionName: "fetchVesselBasicsByVesselId",
  endpoint: "/vesselBasics/{VesselID}",
  inputSchema: vesselBasicsByIdInputSchema,
  outputSchema: vesselBasicSchema,
  sampleParams: { VesselID: 74 },
  endpointDescription: "Get basic information for a specific vessel by ID.",
});
