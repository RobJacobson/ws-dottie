import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for schedule today by terminals
 */
const scheduleTodayByTerminalsFactory = createFetchAndHook<
  ScheduleTodayByTerminalsInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleTodayByTerminalsMeta,
  getEndpointGroup: () =>
    require("./shared/scheduleToday.endpoints").scheduleTodayGroup,
});

/**
 * Fetch function and React Query hook for retrieving today's schedule for a terminal pair
 */
export const {
  fetch: fetchScheduleTodayByTerminals,
  hook: useScheduleTodayByTerminals,
} = scheduleTodayByTerminalsFactory;
