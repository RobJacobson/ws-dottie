import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import {
  type VesselBasicsByIdInput,
  type VesselBasicsInput,
  vesselBasicsByIdInputSchema,
  vesselBasicsInputSchema,
} from "./vesselBasics.input";
import { type VesselBasic, vesselBasicSchema } from "./vesselBasics.output";

export const vesselBasicsGroup = defineEndpointGroup({
  name: "vessel-basics",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each VesselBasic item represents essential identification and operational status data for Washington State Ferries vessels. These items include vessel names, identification numbers, vessel classifications, and current operational status including service availability and maintenance schedules.",
    businessContext:
      "Use to display vessel information and track fleet status by providing identification details and operational status for passenger information systems. Supports trip planning applications and fleet management tools for Washington State Ferry services.",
  },
});

export const fetchVesselBasics = defineEndpoint<
  VesselBasicsInput,
  VesselBasic[]
>({
  api: API,
  group: vesselBasicsGroup,
  functionName: "fetchVesselBasics",
  endpoint: "/vesselBasics",
  inputSchema: vesselBasicsInputSchema,
  outputSchema: vesselBasicSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple VesselBasic objects for all vessels in fleet.",
});

export const fetchVesselBasicsByVesselId = defineEndpoint<
  VesselBasicsByIdInput,
  VesselBasic
>({
  api: API,
  group: vesselBasicsGroup,
  functionName: "fetchVesselBasicsByVesselId",
  endpoint: "/vesselBasics/{VesselID}",
  inputSchema: vesselBasicsByIdInputSchema,
  outputSchema: vesselBasicSchema,
  sampleParams: { VesselID: 74 },
  endpointDescription:
    "Returns a VesselBasic object containing essential identification and status information for the specified vessel.",
});
