import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Today's schedule provides current day sailing information for ferry routes, with options to show only remaining times for real-time schedule information.";

export const scheduleTodayResource = {
  name: "schedule-today",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byRoute: {
      function: "getScheduleTodayByRoute",
      endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
      inputSchema: i.scheduleTodayByRouteSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
      cacheStrategy: "STATIC",
      description: `Returns today's schedule for the specified route. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.ScheduleTodayByRouteInput, o.Schedule>,
    byTerminals: {
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
      cacheStrategy: "STATIC",
      description: `Returns today's schedule for the specified terminal pair. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TodaysScheduleByTerminalComboInput,
      o.Schedule
    >,
  },
};
