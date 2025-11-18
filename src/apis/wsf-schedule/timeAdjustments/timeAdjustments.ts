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
  type TimeAdjustmentsInput,
  timeAdjustmentsInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustments endpoint
 */
export const timeAdjustmentsMeta = {
  functionName: "fetchTimeAdjustments",
  endpoint: "/timeadj",
  inputSchema: timeAdjustmentsInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: {},
  endpointDescription: "List all time adjustments across all routes.",
} satisfies EndpointMeta<TimeAdjustmentsInput, TimeAdjustment[]>;

/**
 * Fetch function for retrieving all time adjustments across all routes
 */
export const fetchTimeAdjustments: (
  params?: FetchFunctionParams<TimeAdjustmentsInput>
) => Promise<TimeAdjustment[]> = createFetchFunction(
  wsfScheduleApi.api,
  timeAdjustmentsGroup,
  timeAdjustmentsMeta
);

/**
 * React Query hook for retrieving all time adjustments across all routes
 */
export const useTimeAdjustments: (
  params?: FetchFunctionParams<TimeAdjustmentsInput>,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error> = createHook(
  wsfScheduleApi.api,
  timeAdjustmentsGroup,
  timeAdjustmentsMeta
);
