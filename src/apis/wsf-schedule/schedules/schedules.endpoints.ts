import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { API } from "../apiDefinition";
import {
  scheduleByTripDateAndRouteIdInputSchema,
  scheduleByTripDateAndTerminals,
} from "./schedules.input";
import { scheduleSchema } from "./schedules.output";

export const schedulesGroup = defineEndpointGroup({
  name: "schedules",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each Schedules item represents a complete sailing timetable for ferry routes. Each schedule includes departure times, arrival times, vessel assignments, and route-specific scheduling information for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing complete sailing timetables including departure times, arrival times, and vessel assignments for trip planning.",
  },
});

export const fetchScheduleByTripDateAndRouteId = defineEndpoint({
  api: API,
  group: schedulesGroup,
  functionName: "fetchScheduleByTripDateAndRouteId",
  endpoint: "/schedule/{TripDate}/{RouteID}",
  inputSchema: scheduleByTripDateAndRouteIdInputSchema,
  outputSchema: scheduleSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription: "Returns single of Schedules for specified route.",
});

export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  defineEndpoint({
    api: API,
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
