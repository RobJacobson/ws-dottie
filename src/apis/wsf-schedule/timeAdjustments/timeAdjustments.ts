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
export const fetchTimeAdjustments: FetchFactory<
  TimeAdjustmentsInput,
  TimeAdjustment[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsMeta,
});

/**
 * React Query hook for retrieving all time adjustments across all routes
 */
export const useTimeAdjustments: HookFactory<
  TimeAdjustmentsInput,
  TimeAdjustment[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: timeAdjustmentsMeta.functionName,
  fetchFn: fetchTimeAdjustments,
  cacheStrategy: timeAdjustmentsGroup.cacheStrategy,
});
