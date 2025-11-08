import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { schedulesResource } from "./schedules.endpoints";
import * as fetchFunctions from "./schedules.fetch";
import type {
  ScheduleByTripDateAndRouteIdInput,
  ScheduleByTripDateAndTerminalsInput,
} from "./schedules.input";
import type { Schedule } from "./schedules.output";

const hooks = createHooks(wsfScheduleApi, schedulesResource, fetchFunctions);

export const useScheduleByTripDateAndRouteId: (
  params?: FetchFunctionParams<ScheduleByTripDateAndRouteIdInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = hooks.useScheduleByTripDateAndRouteId;

export const useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: (
  params?: FetchFunctionParams<ScheduleByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> =
  hooks.useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds;
