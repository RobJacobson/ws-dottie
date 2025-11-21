import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TimeAdjustmentsBySchedRouteInput,
  timeAdjustmentsBySchedRouteInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustmentsBySchedRoute endpoint
 */
export const timeAdjustmentsBySchedRouteMeta = {
  functionName: "fetchTimeAdjustmentsBySchedRoute",
  endpoint: "/timeadjbyschedroute/{SchedRouteID}",
  inputSchema: timeAdjustmentsBySchedRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription: "List time adjustments for a specific scheduled route.",
} satisfies EndpointMeta<TimeAdjustmentsBySchedRouteInput, TimeAdjustment[]>;

/**
 * Factory result for time adjustments by scheduled route
 */
const timeAdjustmentsBySchedRouteFactory = createFetchAndHook<
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustment[]
>({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsBySchedRouteMeta,
  getEndpointGroup: () =>
    require("./shared/timeAdjustments.endpoints").timeAdjustmentsGroup,
});

/**
 * Fetch function and React Query hook for retrieving time adjustments for a specific scheduled route
 */
export const {
  fetch: fetchTimeAdjustmentsBySchedRoute,
  hook: useTimeAdjustmentsBySchedRoute,
} = timeAdjustmentsBySchedRouteFactory;
