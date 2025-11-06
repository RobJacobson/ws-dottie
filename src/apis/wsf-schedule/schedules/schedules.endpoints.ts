import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/factories";
import type {
  ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput,
  ScheduleByTripDateAndRouteIdInput,
} from "./schedules.input";
import {
  scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInputSchema,
  scheduleByTripDateAndRouteIdInputSchema,
} from "./schedules.input";
import type { Schedule } from "./schedules.output";
import { scheduleSchema } from "./schedules.output";

export const schedulesResource = {
  name: "schedules",
  documentation: {
    resourceDescription:
      "Each Schedules item represents a complete sailing timetable for ferry routes. Each schedule includes departure times, arrival times, vessel assignments, and route-specific scheduling information for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing complete sailing timetables including departure times, arrival times, and vessel assignments for trip planning.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduleByTripDateAndRouteId: {
      function: "getScheduleByTripDateAndRouteId",
      endpoint: "/schedule/{TripDate}/{RouteID}",
      inputSchema: scheduleByTripDateAndRouteIdInputSchema,
      outputSchema: scheduleSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      endpointDescription: "Returns single of Schedules for specified route.",
    } satisfies EndpointDefinition<ScheduleByTripDateAndRouteIdInput, Schedule>,
    getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: {
      function: "getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
      endpoint:
        "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema:
        scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInputSchema,
      outputSchema: scheduleSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription: "Returns single of Schedules for terminal pair.",
    } satisfies EndpointDefinition<
      ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput,
      Schedule
    >,
  },
} satisfies EndpointGroup;
