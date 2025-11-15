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
    resourceDescription:
      "Time adjustments represent modifications to scheduled sailing times, including delays, early departures, and other timing changes that affect the published schedule.",
    businessContext: "",
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
  endpointDescription: "Returns all time adjustments.",
});

export const fetchTimeAdjustmentsByRoute = createEndpoint({
  api: apis.wsfSchedule,
  group: timeAdjustmentsGroup,
  functionName: "fetchTimeAdjustmentsByRoute",
  endpoint: "/timeadjbyroute/{RouteID}",
  inputSchema: timeAdjustmentsByRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { RouteID: 1 },
  endpointDescription: "Returns time adjustments for specified route ID.",
});

export const fetchTimeAdjustmentsBySchedRoute = createEndpoint({
  api: apis.wsfSchedule,
  group: timeAdjustmentsGroup,
  functionName: "fetchTimeAdjustmentsBySchedRoute",
  endpoint: "/timeadjbyschedroute/{SchedRouteID}",
  inputSchema: timeAdjustmentsBySchedRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription:
    "Returns time adjustments for specified scheduled route ID.",
});
