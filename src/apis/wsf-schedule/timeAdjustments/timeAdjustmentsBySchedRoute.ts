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
 * Fetch function for retrieving time adjustments for a specific scheduled route
 */
export const fetchTimeAdjustmentsBySchedRoute: FetchFactory<
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustment[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsBySchedRouteMeta,
});

/**
 * React Query hook for retrieving time adjustments for a specific scheduled route
 */
export const useTimeAdjustmentsBySchedRoute: HookFactory<
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustment[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: timeAdjustmentsBySchedRouteMeta.functionName,
  fetchFn: fetchTimeAdjustmentsBySchedRoute,
  cacheStrategy: timeAdjustmentsGroup.cacheStrategy,
});
