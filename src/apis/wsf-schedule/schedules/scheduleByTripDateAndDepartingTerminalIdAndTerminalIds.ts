import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for schedule by trip date and departing terminal ID and terminal IDs
 */
const scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsFactory =
  createFetchAndHook<ScheduleByTripDateAndTerminalsInput, Schedule>({
    api: wsfScheduleApiMeta,
    endpoint: scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta,
    getEndpointGroup: () =>
      require("./shared/schedules.endpoints").schedulesGroup,
  });

/**
 * Fetch function and React Query hook for retrieving sailing schedule for a terminal pair and trip date
 */
export const {
  fetch: fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  hook: useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
} = scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsFactory;
