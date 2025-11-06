import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  MountainPassConditionByIdInput,
  MountainPassConditionsInput,
} from "./passConditions.input";
import {
  mountainPassConditionByIdInputSchema,
  mountainPassConditionsInputSchema,
} from "./passConditions.input";
import type { PassCondition } from "./passConditions.output";
import { passConditionSchema } from "./passConditions.output";

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
      inputSchema: mountainPassConditionByIdInputSchema,
      outputSchema: passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      endpointDescription:
        "Returns a single PassCondition for specified mountain pass identifier.",
    } satisfies EndpointDefinition<
      MountainPassConditionByIdInput,
      PassCondition
    >,
    getMountainPassConditions: {
      function: "getMountainPassConditions",
      endpoint: "/getMountainPassConditionsAsJson",
      inputSchema: mountainPassConditionsInputSchema,
      outputSchema: z.array(passConditionSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple PassCondition items for all monitored mountain passes.",
    } satisfies EndpointDefinition<
      MountainPassConditionsInput,
      PassCondition[]
    >,
  },
} satisfies EndpointGroup;
