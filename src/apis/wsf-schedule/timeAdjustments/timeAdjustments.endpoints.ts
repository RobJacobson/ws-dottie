import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  timeAdjustmentsByRouteInputSchema,
  timeAdjustmentsBySchedRouteInputSchema,
  timeAdjustmentsInputSchema,
} from "./timeAdjustments.input";
import { timeAdjustmentSchema } from "./timeAdjustments.output";

export const timeAdjustmentsGroup: EndpointGroup = {
  name: "time-adjustments",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Modifications to scheduled sailing times for specific dates.",
    description:
      "Time adjustments include additions, cancellations, and timing changes that deviate from published schedules, such as tidal cancellations. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display schedule deviations and special date modifications.",
      "Identify tidal adjustments and event-based cancellations.",
      "Show accurate sailing times that differ from published schedules.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchTimeAdjustments = createEndpoint({
  api: apis.wsfSchedule,
  group: timeAdjustmentsGroup,
  functionName: "fetchTimeAdjustments",
  endpoint: "/timeadj",
  inputSchema: timeAdjustmentsInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: {},
  endpointDescription: "List all time adjustments across all routes.",
});

export const fetchTimeAdjustmentsByRoute = createEndpoint({
  api: apis.wsfSchedule,
  group: timeAdjustmentsGroup,
  functionName: "fetchTimeAdjustmentsByRoute",
  endpoint: "/timeadjbyroute/{RouteID}",
  inputSchema: timeAdjustmentsByRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { RouteID: 1 },
  endpointDescription: "List time adjustments for a specific route.",
});

export const fetchTimeAdjustmentsBySchedRoute = createEndpoint({
  api: apis.wsfSchedule,
  group: timeAdjustmentsGroup,
  functionName: "fetchTimeAdjustmentsBySchedRoute",
  endpoint: "/timeadjbyschedroute/{SchedRouteID}",
  inputSchema: timeAdjustmentsBySchedRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription: "List time adjustments for a specific scheduled route.",
});
