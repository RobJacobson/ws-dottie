import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import type { EndpointGroup } from "@/apis/types";
import {
  scheduleTodayByRouteSchema,
  scheduleTodayByTerminalsInputSchema,
} from "./scheduleToday.input";
import { scheduleSchema } from "./scheduleToday.output";

export const scheduleTodayGroup: EndpointGroup = {
  name: "schedule-today",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Today's schedule provides current day sailing information for ferry routes, with options to show only remaining times for real-time schedule information.",
    businessContext: "",
  },
};

export const fetchScheduleTodayByRoute = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: scheduleTodayGroup,
  functionName: "fetchScheduleTodayByRoute",
  endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteSchema,
  outputSchema: scheduleSchema,
  sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
  endpointDescription: "Returns today's schedule for the specified route.",
});

export const fetchScheduleTodayByTerminals = defineEndpoint({
  api: apis.wsdotBorderCrossings,
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
  endpointDescription:
    "Returns today's schedule for the specified terminal pair.",
});
