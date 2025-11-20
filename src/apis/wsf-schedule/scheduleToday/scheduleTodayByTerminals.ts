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
export const fetchScheduleTodayByTerminals: FetchFactory<
  ScheduleTodayByTerminalsInput,
  Schedule
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduleTodayByTerminalsMeta,
});

/**
 * React Query hook for retrieving today's schedule for a terminal pair
 */
export const useScheduleTodayByTerminals: HookFactory<
  ScheduleTodayByTerminalsInput,
  Schedule
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduleTodayByTerminalsMeta.functionName,
  fetchFn: fetchScheduleTodayByTerminals,
  cacheStrategy: scheduleTodayGroup.cacheStrategy,
});
