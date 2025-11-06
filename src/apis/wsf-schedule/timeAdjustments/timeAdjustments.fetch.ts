import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { timeAdjustmentsResource } from "./timeAdjustments.endpoints";
import type {
  TimeAdjustmentsByRouteInput,
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustmentsInput,
} from "./timeAdjustments.input";
import type { TimeAdjustment } from "./timeAdjustments.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  timeAdjustmentsResource
);

export const fetchTimeAdjustments = fetchFunctions.fetchTimeAdjustments as (
  params?: FetchFunctionParams<TimeAdjustmentsInput>
) => Promise<TimeAdjustment[]>;

export const fetchTimeAdjustmentsByRoute =
  fetchFunctions.fetchTimeAdjustmentsByRoute as (
    params?: FetchFunctionParams<TimeAdjustmentsByRouteInput>
  ) => Promise<TimeAdjustment[]>;

export const fetchTimeAdjustmentsBySchedRoute =
  fetchFunctions.fetchTimeAdjustmentsBySchedRoute as (
    params?: FetchFunctionParams<TimeAdjustmentsBySchedRouteInput>
  ) => Promise<TimeAdjustment[]>;
