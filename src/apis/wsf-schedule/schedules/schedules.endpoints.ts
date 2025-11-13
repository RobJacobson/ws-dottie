import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApi } from "../apiDefinition";
import {
  scheduleByTripDateAndRouteIdInputSchema,
  scheduleByTripDateAndTerminals,
} from "./schedules.input";
import { scheduleSchema } from "./schedules.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
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
  group,
  functionName: "fetchScheduleByTripDateAndRouteId",
  definition: {
    endpoint: "/schedule/{TripDate}/{RouteID}",
    inputSchema: scheduleByTripDateAndRouteIdInputSchema,
    outputSchema: scheduleSchema,
    sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
    endpointDescription: "Returns single of Schedules for specified route.",
  },
});

export const fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  defineEndpoint({
    group,
    functionName: "fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
    definition: {
      endpoint:
        "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: scheduleByTripDateAndTerminals,
      outputSchema: scheduleSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription: "Returns single of Schedules for terminal pair.",
    },
  });

export const schedulesResource = group.descriptor;
