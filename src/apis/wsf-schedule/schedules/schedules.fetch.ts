import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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

export const fetchScheduleByTripDateAndRouteId: (
  params?: FetchFunctionParams<ScheduleByTripDateAndRouteIdInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleByTripDateAndRouteId;

export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: (
  params?: FetchFunctionParams<ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds;
