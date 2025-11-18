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
  type ScheduleTodayByRouteInput,
  scheduleTodayByRouteSchema,
} from "./shared/scheduleToday.input";
import { type Schedule, scheduleSchema } from "./shared/scheduleToday.output";

/**
 * Metadata for the fetchScheduleTodayByRoute endpoint
 */
export const scheduleTodayByRouteMeta = {
  functionName: "fetchScheduleTodayByRoute",
  endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteSchema,
  outputSchema: scheduleSchema,
  sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
  endpointDescription: "Get today's schedule for a specific route.",
} satisfies EndpointMeta<ScheduleTodayByRouteInput, Schedule>;

/**
 * Fetch function for retrieving today's schedule for a specific route
 */
export const fetchScheduleTodayByRoute: (
  params?: FetchFunctionParams<ScheduleTodayByRouteInput>
) => Promise<Schedule> = createFetchFunction(
  wsfScheduleApi.api,
  scheduleTodayGroup,
  scheduleTodayByRouteMeta
);

/**
 * React Query hook for retrieving today's schedule for a specific route
 */
export const useScheduleTodayByRoute: (
  params?: FetchFunctionParams<ScheduleTodayByRouteInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = createHook(
  wsfScheduleApi.api,
  scheduleTodayGroup,
  scheduleTodayByRouteMeta
);
