import type { EndpointDefinition } from "@/apis/types";
import * as i from "./scheduleToday.input";
import * as o from "./scheduleToday.output";

export const export const scheduleTodayResource = {: EndpointGroup 
  name: "schedule-today",
  resourceDescription:
    "Today's schedule provides current day sailing information for ferry routes,
  documentation: {
    resourceDescription: "Today's schedule provides current day sailing information for ferry routes, with options to show only remaining times for real-time schedule information.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduleTodayByRoute: {
      function: "getScheduleTodayByRoute",
      endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
      inputSchema: i.scheduleTodayByRouteSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
      endpointDescription: "Returns today's schedule for the specified route.",
    } satisfies EndpointDefinition<i.ScheduleTodayByRouteInput, o.Schedule>,
    getScheduleTodayByTerminals: {
      function: "getScheduleTodayByTerminals",
      endpoint:
        "/scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}",
      inputSchema: i.todaysScheduleByTerminalComboSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: {
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        OnlyRemainingTimes: false,
      },
      endpointDescription:
        "Returns today's schedule for the specified terminal pair.",
    } satisfies EndpointDefinition<
      i.TodaysScheduleByTerminalComboInput,
      o.Schedule
    >,
  },
};
