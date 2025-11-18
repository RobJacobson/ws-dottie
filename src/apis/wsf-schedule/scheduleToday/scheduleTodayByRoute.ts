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
} from "@/shared/factories/metaEndpointFactory";
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
  apis.wsfSchedule,
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
  apis.wsfSchedule,
  scheduleTodayGroup,
  scheduleTodayByRouteMeta
);
