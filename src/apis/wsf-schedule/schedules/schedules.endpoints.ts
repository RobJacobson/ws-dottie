import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  scheduleByTripDateAndRouteIdInputSchema,
  scheduleByTripDateAndTerminals,
} from "./schedules.input";
import { scheduleSchema } from "./schedules.output";

export const schedulesGroup: EndpointGroup = {
  name: "schedules",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Complete sailing timetables for ferry routes.",
    description:
      "Sailing schedules including departure times, arrival times, vessel assignments, and route-specific information. Accounts for contingencies, sailing date ranges, and time adjustments. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Plan ferry travel with complete sailing timetables.",
      "Look up departure and arrival times for specific dates.",
      "View vessel assignments and loading rules for sailings.",
    ],
  },
};

export const fetchScheduleByTripDateAndRouteId = createEndpoint({
  api: apis.wsfSchedule,
  group: schedulesGroup,
  functionName: "fetchScheduleByTripDateAndRouteId",
  endpoint: "/schedule/{TripDate}/{RouteID}",
  inputSchema: scheduleByTripDateAndRouteIdInputSchema,
  outputSchema: scheduleSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription:
    "Get sailing schedule for a specific route and trip date.",
});

export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  createEndpoint({
    api: apis.wsfSchedule,
    group: schedulesGroup,
    functionName: "fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
    endpoint: "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
    inputSchema: scheduleByTripDateAndTerminals,
    outputSchema: scheduleSchema,
    sampleParams: {
      TripDate: datesHelper.tomorrow(),
      DepartingTerminalID: 1,
      ArrivingTerminalID: 10,
    },
    endpointDescription:
      "Get sailing schedule for a terminal pair and trip date.",
  });
