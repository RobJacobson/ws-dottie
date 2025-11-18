import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { scheduleTodayGroup } from "./shared/scheduleToday.endpoints";
import {
  type ScheduleTodayByTerminalsInput,
  scheduleTodayByTerminalsInputSchema,
} from "./shared/scheduleToday.input";
import { type Schedule, scheduleSchema } from "./shared/scheduleToday.output";

/**
 * Metadata for the fetchScheduleTodayByTerminals endpoint
 */
export const scheduleTodayByTerminalsMeta = {
  functionName: "fetchScheduleTodayByTerminals",
  endpoint:
    "/scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByTerminalsInputSchema,
  outputSchema: scheduleSchema,
  sampleParams: {
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
    OnlyRemainingTimes: false,
  },
  endpointDescription: "Get today's schedule for a terminal pair.",
} satisfies EndpointMeta<ScheduleTodayByTerminalsInput, Schedule>;

/**
 * Fetch function for retrieving today's schedule for a terminal pair
 */
export const fetchScheduleTodayByTerminals: (
  params?: FetchFunctionParams<ScheduleTodayByTerminalsInput>
) => Promise<Schedule> = createFetchFunction(
  wsfScheduleApi.api,
  scheduleTodayGroup,
  scheduleTodayByTerminalsMeta
);

/**
 * React Query hook for retrieving today's schedule for a terminal pair
 */
export const useScheduleTodayByTerminals: (
  params?: FetchFunctionParams<ScheduleTodayByTerminalsInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = createHook(
  wsfScheduleApi.api,
  scheduleTodayGroup,
  scheduleTodayByTerminalsMeta
);
