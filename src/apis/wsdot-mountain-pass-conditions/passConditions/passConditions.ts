import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./passConditions.input";
import * as o from "./passConditions.output";

export const passConditionsResource: EndpointGroup = {
  name: "pass-conditions",
  documentation: {
    resourceDescription:
      "Each PassCondition item represents real-time mountain pass conditions including weather, road conditions, temperature, elevation, and travel restrictions. Data is provided by the Mountain Pass Entry system covering 15 passes.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getMountainPassConditionById: {
      function: "getMountainPassConditionById",
      endpoint:
        "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: i.getMountainPassConditionSchema,
      outputSchema: o.passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      endpointDescription:
        "Returns PassCondition data for the mountain pass with the given identifier.",
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
        "Returns a list of PassCondition data for all mountain passes.",
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionsInput,
      o.PassCondition[]
    >,
  },
};
