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
export const fetchTimeAdjustmentsByRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsByRouteInput>
) => Promise<TimeAdjustment[]> = createFetchFunction(
  wsfScheduleApi,
  timeAdjustmentsGroup,
  timeAdjustmentsByRouteMeta
);

/**
 * React Query hook for retrieving time adjustments for a specific route
 */
export const useTimeAdjustmentsByRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsByRouteInput>,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error> = createHook(
  wsfScheduleApi,
  timeAdjustmentsGroup,
  timeAdjustmentsByRouteMeta
);
