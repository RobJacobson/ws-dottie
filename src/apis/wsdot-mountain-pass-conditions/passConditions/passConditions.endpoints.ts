import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotMountainPassConditionsApi } from "../apiDefinition";
import {
  mountainPassConditionByIdInputSchema,
  mountainPassConditionsInputSchema,
} from "./passConditions.input";
import { passConditionSchema } from "./passConditions.output";

const group = defineEndpointGroup({
  api: wsdotMountainPassConditionsApi,
  name: "pass-conditions",
  documentation: {
    resourceDescription:
      "Each PassCondition item represents real-time mountain pass conditions including weather, road conditions, temperature, elevation, and travel restrictions. Data is provided by the Mountain Pass Entry system covering 15 passes.",
    businessContext:
      "Use to assess mountain pass conditions for travel planning by providing current weather, road status, and restriction information for safe mountain travel.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchMountainPassConditionById = defineEndpoint({
  group,
  functionName: "fetchMountainPassConditionById",
  definition: {
    endpoint: "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
    inputSchema: mountainPassConditionByIdInputSchema,
    outputSchema: passConditionSchema,
    sampleParams: { PassConditionID: 12 },
    endpointDescription:
      "Returns a single PassCondition for specified mountain pass identifier.",
  },
});

export const fetchMountainPassConditions = defineEndpoint({
  group,
  functionName: "fetchMountainPassConditions",
  definition: {
    endpoint: "/getMountainPassConditionsAsJson",
    inputSchema: mountainPassConditionsInputSchema,
    outputSchema: passConditionSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple PassCondition items for all monitored mountain passes.",
  },
});

export const passConditionsGroup = group.descriptor;
