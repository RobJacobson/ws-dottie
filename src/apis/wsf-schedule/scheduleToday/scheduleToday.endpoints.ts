import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import {
  type ScheduleTodayByRouteInput,
  type ScheduleTodayByTerminalsInput,
  scheduleTodayByRouteSchema,
  scheduleTodayByTerminalsInputSchema,
} from "./scheduleToday.input";
import { type Schedule, scheduleSchema } from "./scheduleToday.output";

export const scheduleTodayResource = {
  name: "schedule-today",
  documentation: {
    resourceDescription:
      "Today's schedule provides current day sailing information for ferry routes, with options to show only remaining times for real-time schedule information.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchScheduleTodayByRoute: {
      endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
      inputSchema: scheduleTodayByRouteSchema,
      outputSchema: scheduleSchema,
      sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
      endpointDescription: "Returns today's schedule for the specified route.",
    } satisfies EndpointDefinition<ScheduleTodayByRouteInput, Schedule>,
    fetchScheduleTodayByTerminals: {
      endpoint:
        "/scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}",
      inputSchema: scheduleTodayByTerminalsInputSchema,
      outputSchema: scheduleSchema,
      sampleParams: {
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        OnlyRemainingTimes: false,
      },
      endpointDescription:
        "Returns today's schedule for the specified terminal pair.",
    } satisfies EndpointDefinition<ScheduleTodayByTerminalsInput, Schedule>,
  },
} satisfies EndpointGroup;
