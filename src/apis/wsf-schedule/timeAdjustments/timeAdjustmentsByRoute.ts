import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import { timeAdjustmentsGroup } from "./shared/timeAdjustments.endpoints";
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
 * Fetch function for retrieving time adjustments for a specific route
 */
export const fetchTimeAdjustmentsByRoute: FetchFactory<
  TimeAdjustmentsByRouteInput,
  TimeAdjustment[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsByRouteMeta,
});

/**
 * React Query hook for retrieving time adjustments for a specific route
 */
export const useTimeAdjustmentsByRoute: HookFactory<
  TimeAdjustmentsByRouteInput,
  TimeAdjustment[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: timeAdjustmentsByRouteMeta.functionName,
  fetchFn: fetchTimeAdjustmentsByRoute,
  cacheStrategy: timeAdjustmentsGroup.cacheStrategy,
});
