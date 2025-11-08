import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
import { timeAdjustmentsResource } from "./timeAdjustments.endpoints";
import type {
  TimeAdjustmentsByRouteInput,
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustmentsInput,
} from "./timeAdjustments.input";
import type { TimeAdjustment } from "./timeAdjustments.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  timeAdjustmentsResource
);

export const fetchTimeAdjustments: (
  params?: FetchFunctionParams<TimeAdjustmentsInput>
) => Promise<TimeAdjustment[]> = fetchFunctions.fetchTimeAdjustments;

export const fetchTimeAdjustmentsByRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsByRouteInput>
) => Promise<TimeAdjustment[]> = fetchFunctions.fetchTimeAdjustmentsByRoute;

export const fetchTimeAdjustmentsBySchedRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsBySchedRouteInput>
) => Promise<TimeAdjustment[]> =
  fetchFunctions.fetchTimeAdjustmentsBySchedRoute;
