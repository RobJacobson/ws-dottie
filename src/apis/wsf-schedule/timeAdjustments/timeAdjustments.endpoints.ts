import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type TimeAdjustmentsByRouteInput,
  type TimeAdjustmentsBySchedRouteInput,
  type TimeAdjustmentsInput,
  timeAdjustmentsByRouteInputSchema,
  timeAdjustmentsBySchedRouteInputSchema,
  timeAdjustmentsInputSchema,
} from "./timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./timeAdjustments.output";

export const timeAdjustmentsResource = {
  name: "time-adjustments",
  documentation: {
    resourceDescription:
      "Time adjustments represent modifications to scheduled sailing times, including delays, early departures, and other timing changes that affect the published schedule.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchTimeAdjustments: {
      endpoint: "/timeadj",
      inputSchema: timeAdjustmentsInputSchema,
      outputSchema: z.array(timeAdjustmentSchema),
      sampleParams: {},
      endpointDescription: "Returns all time adjustments.",
    } satisfies EndpointDefinition<TimeAdjustmentsInput, TimeAdjustment[]>,
    fetchTimeAdjustmentsByRoute: {
      endpoint: "/timeadjbyroute/{RouteID}",
      inputSchema: timeAdjustmentsByRouteInputSchema,
      outputSchema: z.array(timeAdjustmentSchema),
      sampleParams: { RouteID: 1 },
      endpointDescription:
        "Returns time adjustments for the specified route ID.",
    } satisfies EndpointDefinition<
      TimeAdjustmentsByRouteInput,
      TimeAdjustment[]
    >,
    fetchTimeAdjustmentsBySchedRoute: {
      endpoint: "/timeadjbyschedroute/{SchedRouteID}",
      inputSchema: timeAdjustmentsBySchedRouteInputSchema,
      outputSchema: z.array(timeAdjustmentSchema),
      sampleParams: { SchedRouteID: 2401 },
      endpointDescription:
        "Returns time adjustments for the specified scheduled route ID.",
    } satisfies EndpointDefinition<
      TimeAdjustmentsBySchedRouteInput,
      TimeAdjustment[]
    >,
  },
} satisfies EndpointGroup;
