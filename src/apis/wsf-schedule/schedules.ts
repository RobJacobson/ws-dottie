import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Schedules provide comprehensive sailing timetables for ferry routes, including departure times, arrival times, vessel assignments, and route-specific scheduling information.";

export const schedulesResource = {
  name: "schedules",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byTripDateAndRouteId: {
      function: "getScheduleByTripDateAndRouteId",
      endpoint: "/schedule/{TripDate}/{RouteID}",
      inputSchema: i.scheduleByRouteSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      cacheStrategy: "STATIC",
      description: `Returns the schedule for the specified trip date and route ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.ScheduleByRouteInput, o.Schedule>,
    byTripDateAndTerminals: {
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
      cacheStrategy: "STATIC",
      description: `Returns the schedule for the specified trip date and terminal pair. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.ScheduleByTerminalComboInput, o.Schedule>,
  },
};
