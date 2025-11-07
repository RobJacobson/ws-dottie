import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { schedulesResource } from "./schedules.endpoints";
import * as fetchFunctions from "./schedules.fetch";
import type {
  ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput,
  ScheduleByTripDateAndRouteIdInput,
} from "./schedules.input";
import type { Schedule } from "./schedules.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  schedulesResource,
  fetchFunctions
);

export const useScheduleByTripDateAndRouteId: (
  params?: ScheduleByTripDateAndRouteIdInput,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = hooks.useScheduleByTripDateAndRouteId;

export const useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: (
  params?: ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> =
  hooks.useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds;
