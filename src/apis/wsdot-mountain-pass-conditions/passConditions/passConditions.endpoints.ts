import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  mountainPassConditionByIdInputSchema,
  mountainPassConditionsInputSchema,
} from "./passConditions.input";
import { passConditionSchema } from "./passConditions.output";

export const passConditionsGroup: EndpointGroup = {
  name: "pass-conditions",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Real-time mountain pass conditions including weather, road status, and travel restrictions.",
    description:
      "Current conditions for 15 monitored mountain passes statewide, including temperature, elevation, weather, road surface conditions, and direction-specific travel restrictions.",
    useCases: [
      "Assess pass conditions for winter travel planning.",
      "Monitor weather and road conditions for route decisions.",
      "Check travel restrictions and advisories before mountain travel.",
    ],
    updateFrequency: "15m",
  },
};

export const fetchMountainPassConditionById = createEndpoint({
  api: apis.wsdotMountainPassConditions,
  group: passConditionsGroup,
  functionName: "fetchMountainPassConditionById",
  endpoint: "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
  inputSchema: mountainPassConditionByIdInputSchema,
  outputSchema: passConditionSchema,
  sampleParams: { PassConditionID: 12 },
  endpointDescription:
    "Get current conditions for a specific mountain pass by ID.",
});

export const fetchMountainPassConditions = createEndpoint({
  api: apis.wsdotMountainPassConditions,
  group: passConditionsGroup,
  functionName: "fetchMountainPassConditions",
  endpoint: "/getMountainPassConditionsAsJson",
  inputSchema: mountainPassConditionsInputSchema,
  outputSchema: passConditionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current conditions for all monitored mountain passes.",
});
