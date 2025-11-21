import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TimeAdjustmentsByRouteInput,
  timeAdjustmentsByRouteInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustmentsByRoute endpoint
 */
export const timeAdjustmentsByRouteMeta = {
  functionName: "fetchTimeAdjustmentsByRoute",
  endpoint: "/timeadjbyroute/{RouteID}",
  inputSchema: timeAdjustmentsByRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { RouteID: 1 },
  endpointDescription: "List time adjustments for a specific route.",
} satisfies EndpointMeta<TimeAdjustmentsByRouteInput, TimeAdjustment[]>;

/**
 * Factory result for time adjustments by route
 */
const timeAdjustmentsByRouteFactory = createFetchAndHook<
  TimeAdjustmentsByRouteInput,
  TimeAdjustment[]
>({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/timeAdjustments.endpoints").timeAdjustmentsGroup,
});

/**
 * Fetch function and React Query hook for retrieving time adjustments for a specific route
 */
export const {
  fetch: fetchTimeAdjustmentsByRoute,
  hook: useTimeAdjustmentsByRoute,
} = timeAdjustmentsByRouteFactory;
