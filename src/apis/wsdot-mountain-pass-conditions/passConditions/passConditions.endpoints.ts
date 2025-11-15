import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import type { EndpointGroup } from "@/apis/types";
import {
  mountainPassConditionByIdInputSchema,
  mountainPassConditionsInputSchema,
} from "./passConditions.input";
import { passConditionSchema } from "./passConditions.output";

export const passConditionsGroup: EndpointGroup = {
  name: "pass-conditions",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each PassCondition item represents real-time mountain pass conditions including weather, road conditions, temperature, elevation, and travel restrictions. Data is provided by Mountain Pass Entry system covering 15 passes.",
    businessContext:
      "Use to assess mountain pass conditions for travel planning by providing current weather, road status, and restriction information for safe mountain travel.",
  },
};

export const fetchMountainPassConditionById = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: passConditionsGroup,
  functionName: "fetchMountainPassConditionById",
  endpoint: "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
  inputSchema: mountainPassConditionByIdInputSchema,
  outputSchema: passConditionSchema,
  sampleParams: { PassConditionID: 12 },
  endpointDescription:
    "Returns a single PassCondition for specified mountain pass identifier.",
});

export const fetchMountainPassConditions = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: passConditionsGroup,
  functionName: "fetchMountainPassConditions",
  endpoint: "/getMountainPassConditionsAsJson",
  inputSchema: mountainPassConditionsInputSchema,
  outputSchema: passConditionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple PassCondition items for all monitored mountain passes.",
});
