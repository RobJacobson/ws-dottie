import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchTimeAdjustmentsBySchedRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsBySchedRouteInput>
) => Promise<TimeAdjustment[]> = createFetchFunction(
  wsfScheduleApi,
  timeAdjustmentsGroup,
  timeAdjustmentsBySchedRouteMeta
);

/**
 * React Query hook for retrieving time adjustments for a specific scheduled route
 */
export const useTimeAdjustmentsBySchedRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsBySchedRouteInput>,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error> = createHook(
  wsfScheduleApi,
  timeAdjustmentsGroup,
  timeAdjustmentsBySchedRouteMeta
);
