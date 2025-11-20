import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchScheduleTodayByRoute: FetchFactory<
  ScheduleTodayByRouteInput,
  Schedule
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduleTodayByRouteMeta,
});

/**
 * React Query hook for retrieving today's schedule for a specific route
 */
export const useScheduleTodayByRoute: HookFactory<
  ScheduleTodayByRouteInput,
  Schedule
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduleTodayByRouteMeta.functionName,
  fetchFn: fetchScheduleTodayByRoute,
  cacheStrategy: scheduleTodayGroup.cacheStrategy,
});
