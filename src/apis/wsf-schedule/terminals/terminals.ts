import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./terminals.input";
import * as o from "./terminals.output";

export const scheduleTerminalsResource = {
  name: "schedule-terminals",
  resourceDescription:
    "Terminals represent the ferry dock locations where passengers board and disembark, including terminal identification, location information, and service details.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminals: {
      function: "getTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription: "Returns all terminals for the specified trip date.",
    } satisfies EndpointDefinition<i.ScheduleTerminalsInput, o.Terminal[]>,
    getTerminalsAndMates: {
      function: "getTerminalsAndMates",
      endpoint: "/terminalsandmates/{TripDate}",
      inputSchema: i.terminalsAndMatesSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns all terminals with their mates for the specified trip date.",
    } satisfies EndpointDefinition<i.TerminalsAndMatesInput, o.TerminalMate[]>,
    getTerminalsAndMatesByRoute: {
      function: "getTerminalsAndMatesByRoute",
      endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
      inputSchema: i.terminalsAndMatesByRouteSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      endpointDescription:
        "Returns terminals and their mates for the specified trip date and route.",
    } satisfies EndpointDefinition<
      i.TerminalsAndMatesByRouteInput,
      o.TerminalMate[]
    >,
  },
};
