import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: FetchFactory<
  ScheduleByTripDateAndTerminalsInput,
  Schedule
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta,
});

/**
 * React Query hook for retrieving sailing schedule for a terminal pair and trip date
 */
export const useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: HookFactory<
  ScheduleByTripDateAndTerminalsInput,
  Schedule
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName:
    scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta.functionName,
  fetchFn: fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  cacheStrategy: schedulesGroup.cacheStrategy,
});
