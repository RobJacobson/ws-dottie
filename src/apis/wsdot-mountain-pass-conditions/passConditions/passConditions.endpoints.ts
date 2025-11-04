import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./passConditions.input";
import * as o from "./passConditions.output";

export const passConditionsResource: EndpointGroup = {
  name: "pass-conditions",
  documentation: {
    resourceDescription:
      "Each PassCondition item represents current weather and road conditions for Washington State mountain passes. These include temperature, precipitation, wind conditions, visibility, and any travel restrictions or warnings.",
    businessContext:
      "Use to assess mountain pass conditions for travel planning by providing current weather, road status, and restriction information for safe mountain travel.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  // Using MODERATE strategy because mountain pass conditions typically update hourly as weather changes
  cacheStrategy: "MODERATE" as const,
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
