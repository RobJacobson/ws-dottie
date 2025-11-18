import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { schedulesGroup } from "./shared/schedules.endpoints";
import {
  type ScheduleByTripDateAndTerminalsInput,
  scheduleByTripDateAndTerminals,
} from "./shared/schedules.input";
import { type Schedule, scheduleSchema } from "./shared/schedules.output";

/**
 * Metadata for the fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds endpoint
 */
export const scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta = {
  functionName: "fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
  endpoint: "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: scheduleByTripDateAndTerminals,
  outputSchema: scheduleSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription:
    "Get sailing schedule for a terminal pair and trip date.",
} satisfies EndpointMeta<ScheduleByTripDateAndTerminalsInput, Schedule>;

/**
 * Fetch function for retrieving sailing schedule for a terminal pair and trip date
 */
export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: (
  params?: FetchFunctionParams<ScheduleByTripDateAndTerminalsInput>
) => Promise<Schedule> = createFetchFunction(
  apis.wsfSchedule,
  schedulesGroup,
  scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta
);

/**
 * React Query hook for retrieving sailing schedule for a terminal pair and trip date
 */
export const useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: (
  params?: FetchFunctionParams<ScheduleByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = createHook(
  apis.wsfSchedule,
  schedulesGroup,
  scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta
);
