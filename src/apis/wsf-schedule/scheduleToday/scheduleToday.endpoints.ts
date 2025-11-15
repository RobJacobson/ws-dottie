import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  scheduleTodayByRouteSchema,
  scheduleTodayByTerminalsInputSchema,
} from "./scheduleToday.input";
import { scheduleSchema } from "./scheduleToday.output";

export const scheduleTodayGroup: EndpointGroup = {
  name: "schedule-today",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Today's sailing schedule for ferry routes.",
    description:
      "Current day sailing information with option to show only remaining departures. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Show today's remaining sailings in real-time apps.",
      "Display current day schedule with all departures.",
      "Filter to only upcoming sailings for today.",
    ],
  },
};

export const fetchScheduleTodayByRoute = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTodayGroup,
  functionName: "fetchScheduleTodayByRoute",
  endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteSchema,
  outputSchema: scheduleSchema,
  sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
  endpointDescription: "Get today's schedule for a specific route.",
});

export const fetchScheduleTodayByTerminals = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTodayGroup,
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
});
