import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./timeAdjustments.input";
import * as o from "./timeAdjustments.output";

export const timeAdjustmentsResource = {
  name: "time-adjustments",
  documentation: {
    resourceDescription:
      "Time adjustments represent modifications to scheduled sailing times, including delays, early departures, and other timing changes that affect the published schedule.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTimeAdjustments: {
      function: "getTimeAdjustments",
      endpoint: "/timeadj",
      inputSchema: i.timeAdjSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: {},
      endpointDescription: "Returns all time adjustments.",
    } satisfies EndpointDefinition<i.TimeAdjInput, o.TimeAdjustment[]>,
    getTimeAdjustmentsByRoute: {
      function: "getTimeAdjustmentsByRoute",
      endpoint: "/timeadjbyroute/{RouteID}",
      inputSchema: i.timeAdjByRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { RouteID: 1 },
      endpointDescription:
        "Returns time adjustments for the specified route ID.",
    } satisfies EndpointDefinition<i.TimeAdjByRouteInput, o.TimeAdjustment[]>,
    getTimeAdjustmentsBySchedRoute: {
      function: "getTimeAdjustmentsBySchedRoute",
      endpoint: "/timeadjbyschedroute/{SchedRouteID}",
      inputSchema: i.timeAdjBySchedRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { SchedRouteID: 2401 },
      endpointDescription:
        "Returns time adjustments for the specified scheduled route ID.",
    } satisfies EndpointDefinition<
      i.TimeAdjBySchedRouteInput,
      o.TimeAdjustment[]
    >,
  },
} satisfies EndpointGroup;
