import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type GetMountainPassConditionInput,
  type GetMountainPassConditionsInput,
  getMountainPassConditionInputSchema,
  getMountainPassConditionsInputSchema,
} from "./passConditions.input";
import {
  type PassCondition,
  passConditionOutputSchema,
  type TravelRestriction,
  travelRestrictionOutputSchema,
} from "./passConditions.output";

export const passConditionsGroup = {
  name: "pass-conditions",
  documentation: {
    resourceDescription:
      "Each PassCondition item represents real-time mountain pass conditions including weather, road conditions, temperature, elevation, and travel restrictions. Data is provided by the Mountain Pass Entry system covering 15 passes.",
    businessContext:
      "Use to assess mountain pass conditions for travel planning by providing current weather, road status, and restriction information for safe mountain travel.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getMountainPassConditionById: {
      function: "getMountainPassConditionById",
      endpoint:
        "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: getMountainPassConditionInputSchema,
      outputSchema: passConditionOutputSchema,
      sampleParams: { PassConditionID: 12 },
      endpointDescription:
        "Returns a single PassCondition for specified mountain pass identifier.",
    } satisfies EndpointDefinition<
      GetMountainPassConditionInput,
      PassCondition
    >,
    getMountainPassConditions: {
      function: "getMountainPassConditions",
      endpoint: "/getMountainPassConditionsAsJson",
      inputSchema: getMountainPassConditionsInputSchema,
      outputSchema: z.array(passConditionOutputSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple PassCondition items for all monitored mountain passes.",
    } satisfies EndpointDefinition<
      GetMountainPassConditionsInput,
      PassCondition[]
    >,
  },
} satisfies EndpointGroup;
