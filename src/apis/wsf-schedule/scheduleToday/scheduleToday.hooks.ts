import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTodayResource } from "./scheduleToday.endpoints";
import * as fetchFunctions from "./scheduleToday.fetch";
import type {
  ScheduleTodayByRouteInput,
  ScheduleTodayByTerminalsInput,
} from "./scheduleToday.input";
import type { Schedule } from "./scheduleToday.output";

const hooks = createHooks(
  wsfScheduleApi,
  scheduleTodayResource,
  fetchFunctions
);

export const useScheduleTodayByRoute: (
  params?: FetchFunctionParams<ScheduleTodayByRouteInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = hooks.useScheduleTodayByRoute;

export const useScheduleTodayByTerminals: (
  params?: FetchFunctionParams<ScheduleTodayByTerminalsInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = hooks.useScheduleTodayByTerminals;
