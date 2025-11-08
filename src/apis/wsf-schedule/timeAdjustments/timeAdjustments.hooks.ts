import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { timeAdjustmentsResource } from "./timeAdjustments.endpoints";
import * as fetchFunctions from "./timeAdjustments.fetch";
import type {
  TimeAdjustmentsByRouteInput,
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustmentsInput,
} from "./timeAdjustments.input";
import type { TimeAdjustment } from "./timeAdjustments.output";

const hooks = createHooks(
  wsfScheduleApi,
  timeAdjustmentsResource,
  fetchFunctions
);

export const useTimeAdjustments: (
  params?: FetchFunctionParams<TimeAdjustmentsInput>,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error> = hooks.useTimeAdjustments;

export const useTimeAdjustmentsByRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsByRouteInput>,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error> = hooks.useTimeAdjustmentsByRoute;

export const useTimeAdjustmentsBySchedRoute: (
  params?: FetchFunctionParams<TimeAdjustmentsBySchedRouteInput>,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error> =
  hooks.useTimeAdjustmentsBySchedRoute;
