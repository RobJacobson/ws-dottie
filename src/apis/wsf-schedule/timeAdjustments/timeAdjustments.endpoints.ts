import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import {
  timeAdjustmentsByRouteInputSchema,
  timeAdjustmentsBySchedRouteInputSchema,
  timeAdjustmentsInputSchema,
} from "./timeAdjustments.input";
import { timeAdjustmentSchema } from "./timeAdjustments.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "time-adjustments",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Time adjustments represent modifications to scheduled sailing times, including delays, early departures, and other timing changes that affect the published schedule.",
    businessContext: "",
  },
});

export const fetchTimeAdjustments = defineEndpoint({
  group,
  functionName: "fetchTimeAdjustments",
  definition: {
    endpoint: "/timeadj",
    inputSchema: timeAdjustmentsInputSchema,
    outputSchema: timeAdjustmentSchema.array(),
    sampleParams: {},
    endpointDescription: "Returns all time adjustments.",
  },
});

export const fetchTimeAdjustmentsByRoute = defineEndpoint({
  group,
  functionName: "fetchTimeAdjustmentsByRoute",
  definition: {
    endpoint: "/timeadjbyroute/{RouteID}",
    inputSchema: timeAdjustmentsByRouteInputSchema,
    outputSchema: timeAdjustmentSchema.array(),
    sampleParams: { RouteID: 1 },
    endpointDescription: "Returns time adjustments for the specified route ID.",
  },
});

export const fetchTimeAdjustmentsBySchedRoute = defineEndpoint({
  group,
  functionName: "fetchTimeAdjustmentsBySchedRoute",
  definition: {
    endpoint: "/timeadjbyschedroute/{SchedRouteID}",
    inputSchema: timeAdjustmentsBySchedRouteInputSchema,
    outputSchema: timeAdjustmentSchema.array(),
    sampleParams: { SchedRouteID: 2401 },
    endpointDescription:
      "Returns time adjustments for the specified scheduled route ID.",
  },
});

export const timeAdjustmentsResource = group.descriptor;
