import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./passConditions.input";
import * as o from "./passConditions.output";

export const passConditionsGroup: EndpointGroup = {
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
      inputSchema: i.getMountainPassConditionSchema,
      outputSchema: o.passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      endpointDescription:
        "Returns a single PassCondition for the specified mountain pass identifier.",
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionInput,
      o.PassCondition
    >,
    getMountainPassConditions: {
      function: "getMountainPassConditions",
      endpoint: "/getMountainPassConditionsAsJson",
      inputSchema: i.getMountainPassConditionsSchema,
      outputSchema: z.array(o.passConditionSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple PassCondition items for all monitored mountain passes.",
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionsInput,
      o.PassCondition[]
    >,
  },
};
