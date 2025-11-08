import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import type {
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
  TerminalsInput,
} from "./terminals.input";
import {
  terminalsAndMatesByRouteInputSchema,
  terminalsAndMatesInputSchema,
  terminalsInputSchema,
} from "./terminals.input";
import type { Terminal, TerminalMate } from "./terminals.output";
import { terminalMateSchema, terminalSchema } from "./terminals.output";

export const scheduleTerminalsResource = {
  name: "schedule-terminals",
  documentation: {
    resourceDescription:
      "Terminals represent the ferry dock locations where passengers board and disembark, including terminal identification, location information, and service details.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchTerminals: {
      endpoint: "/terminals/{TripDate}",
      inputSchema: terminalsInputSchema,
      outputSchema: z.array(terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription: "Returns all terminals for the specified trip date.",
    } satisfies EndpointDefinition<TerminalsInput, Terminal[]>,
    fetchTerminalsAndMates: {
      endpoint: "/terminalsandmates/{TripDate}",
      inputSchema: terminalsAndMatesInputSchema,
      outputSchema: z.array(terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns all terminals with their mates for the specified trip date.",
    } satisfies EndpointDefinition<TerminalsAndMatesInput, TerminalMate[]>,
    fetchTerminalsAndMatesByRoute: {
      endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
      inputSchema: terminalsAndMatesByRouteInputSchema,
      outputSchema: z.array(terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      endpointDescription:
        "Returns terminals and their mates for the specified trip date and route.",
    } satisfies EndpointDefinition<
      TerminalsAndMatesByRouteInput,
      TerminalMate[]
    >,
  },
} satisfies EndpointGroup;
