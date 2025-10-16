import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./schedules.input";
import * as o from "./schedules.output";

export const schedulesResource = {
  name: "schedules",
  resourceDescription:
    "Schedules provide comprehensive sailing timetables for ferry routes, including departure times, arrival times, vessel assignments, and route-specific scheduling information.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduleByTripDateAndRouteId: {
      function: "getScheduleByTripDateAndRouteId",
      endpoint: "/schedule/{TripDate}/{RouteID}",
      inputSchema: i.scheduleByRouteSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      endpointDescription:
        "Returns the schedule for the specified trip date and route ID.",
    } satisfies EndpointDefinition<i.ScheduleByRouteInput, o.Schedule>,
    getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds: {
      function: "getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
      endpoint:
        "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.scheduleByTerminalComboSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription:
        "Returns the schedule for the specified trip date and terminal pair.",
    } satisfies EndpointDefinition<i.ScheduleByTerminalComboInput, o.Schedule>,
  },
};
