import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTodayResource } from "./scheduleToday.endpoints";
import * as fetchFunctions from "./scheduleToday.fetch";
import type {
  ScheduleTodayByRouteInput,
  ScheduleTodayByTerminalsInput,
} from "./scheduleToday.input";
import type { Schedule } from "./scheduleToday.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleTodayResource,
  fetchFunctions
);

export const useScheduleTodayByRoute = hooks.useScheduleTodayByRoute as (
  params?: ScheduleTodayByRouteInput,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error>;

export const useScheduleTodayByTerminals =
  hooks.useScheduleTodayByTerminals as (
    params?: ScheduleTodayByTerminalsInput,
    options?: QueryHookOptions<Schedule>
  ) => UseQueryResult<Schedule, Error>;
