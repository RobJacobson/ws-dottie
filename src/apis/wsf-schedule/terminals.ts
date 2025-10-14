import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Terminals represent the ferry dock locations where passengers board and disembark, including terminal identification, location information, and service details.";

export const scheduleTerminalsResource = {
  name: "schedule-terminals",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byTripDate: {
      function: "getTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns all terminals for the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.ScheduleTerminalsInput, o.Terminal[]>,
    allWithMates: {
      function: "getTerminalsAndMates",
      endpoint: "/terminalsandmates/{TripDate}",
      inputSchema: i.terminalsAndMatesSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns all terminals with their mates for the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TerminalsAndMatesInput, o.TerminalMate[]>,
    matesByRoute: {
      function: "getTerminalsAndMatesByRoute",
      endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
      inputSchema: i.terminalsAndMatesByRouteSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      cacheStrategy: "STATIC",
      description: `Returns terminals and their mates for the specified trip date and route. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalsAndMatesByRouteInput,
      o.TerminalMate[]
    >,
  },
};
