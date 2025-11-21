import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for schedule today by route
 */
const scheduleTodayByRouteFactory = createFetchAndHook<
  ScheduleTodayByRouteInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleTodayByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/scheduleToday.endpoints").scheduleTodayGroup,
});

/**
 * Fetch function and React Query hook for retrieving today's schedule for a specific route
 */
export const {
  fetch: fetchScheduleTodayByRoute,
  hook: useScheduleTodayByRoute,
} = scheduleTodayByRouteFactory;
