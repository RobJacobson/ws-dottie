import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { schedulesResource } from "./schedules.endpoints";
import type {
  ScheduleByTripDateAndRouteIdInput,
  ScheduleByTripDateAndTerminalsInput,
} from "./schedules.input";
import type { Schedule } from "./schedules.output";

const fetchFunctions = createFetchFunctions(wsfScheduleApi, schedulesResource);

export const fetchScheduleByTripDateAndRouteId: (
  params?: FetchFunctionParams<ScheduleByTripDateAndRouteIdInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleByTripDateAndRouteId;

export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: (
  params?: FetchFunctionParams<ScheduleByTripDateAndTerminalsInput>
) => Promise<Schedule> =
  fetchFunctions.fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds;
