import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each PassCondition item represents real-time mountain pass conditions including weather, road conditions, temperature, elevation, and travel restrictions. Data is provided by the Mountain Pass Entry system covering 15 passes.";

export const passConditionsResource = {
  name: "pass-conditions",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byId: {
      function: "getMountainPassConditionById",
      endpoint:
        "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: i.getMountainPassConditionSchema,
      outputSchema: o.passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      cacheStrategy: "STATIC",
      description: `Returns PassCondition data for the mountain pass with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionInput,
      o.PassCondition
    >,
    all: {
      function: "getMountainPassConditions",
      endpoint: "/getMountainPassConditionsAsJson",
      inputSchema: i.getMountainPassConditionsSchema,
      outputSchema: z.array(o.passConditionSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of PassCondition data for all mountain passes. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionsInput,
      o.PassCondition[]
    >,
  },
};
