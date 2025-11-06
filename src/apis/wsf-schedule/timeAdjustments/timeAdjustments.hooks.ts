import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { timeAdjustmentsResource } from "./timeAdjustments.endpoints";
import * as fetchFunctions from "./timeAdjustments.fetch";
import type {
  TimeAdjustmentsByRouteInput,
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustmentsInput,
} from "./timeAdjustments.input";
import type { TimeAdjustment } from "./timeAdjustments.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  timeAdjustmentsResource,
  fetchFunctions
);

export const useTimeAdjustments = hooks.useTimeAdjustments as (
  params?: TimeAdjustmentsInput,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error>;

export const useTimeAdjustmentsByRoute = hooks.useTimeAdjustmentsByRoute as (
  params?: TimeAdjustmentsByRouteInput,
  options?: QueryHookOptions<TimeAdjustment[]>
) => UseQueryResult<TimeAdjustment[], Error>;

export const useTimeAdjustmentsBySchedRoute =
  hooks.useTimeAdjustmentsBySchedRoute as (
    params?: TimeAdjustmentsBySchedRouteInput,
    options?: QueryHookOptions<TimeAdjustment[]>
  ) => UseQueryResult<TimeAdjustment[], Error>;
