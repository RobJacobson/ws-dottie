import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { schedulesResource } from "./schedules.endpoints";
import type {
  ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput,
  ScheduleByTripDateAndRouteIdInput,
} from "./schedules.input";
import type { Schedule } from "./schedules.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  schedulesResource
);

export const fetchScheduleByTripDateAndRouteId =
  fetchFunctions.fetchScheduleByTripDateAndRouteId as (
    params?: FetchFunctionParams<ScheduleByTripDateAndRouteIdInput>
  ) => Promise<Schedule>;

export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  fetchFunctions.fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds as (
    params?: FetchFunctionParams<ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput>
  ) => Promise<Schedule>;
