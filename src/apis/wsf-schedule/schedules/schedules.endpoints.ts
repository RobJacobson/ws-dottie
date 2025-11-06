import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./schedules.input";
import * as o from "./schedules.output";

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
      inputSchema: i.scheduleByTripDateAndRouteIdInputSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      endpointDescription: "Returns single of Schedules for specified route.",
    } satisfies EndpointDefinition<
      i.ScheduleByTripDateAndRouteIdInput,
      o.Schedule
    >,
    getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: {
      function: "getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
      endpoint:
        "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema:
        i.scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInputSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription: "Returns single of Schedules for terminal pair.",
    } satisfies EndpointDefinition<
      i.ScheduleByTripDateAndDepartingTerminalIdAndTerminalIdsInput,
      o.Schedule
    >,
  },
} satisfies EndpointGroup;
