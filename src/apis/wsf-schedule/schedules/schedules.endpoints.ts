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
    resourceDescription:
      "Each Schedules item represents a complete sailing timetable for ferry routes. Each schedule includes departure times, arrival times, vessel assignments, and route-specific scheduling information for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing complete sailing timetables including departure times, arrival times, and vessel assignments for trip planning.",
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
  endpointDescription: "Returns single of Schedules for specified route.",
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
    endpointDescription: "Returns single of Schedules for terminal pair.",
  });
