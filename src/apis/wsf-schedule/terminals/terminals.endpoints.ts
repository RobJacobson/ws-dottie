import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  terminalsAndMatesByRouteInputSchema,
  terminalsAndMatesInputSchema,
  terminalsInputSchema,
} from "./terminals.input";
import { terminalMateSchema, terminalSchema } from "./terminals.output";

export const scheduleTerminalsGroup: EndpointGroup = {
  name: "schedule-terminals",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Ferry terminal facilities serving as departure and arrival points.",
    description:
      "Terminals represent dock locations where passengers board and disembark. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal options for trip planning interfaces.",
      "Determine valid terminal pairs for route selection.",
      "Build terminal lookup and navigation features.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchTerminals = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTerminalsGroup,
  functionName: "fetchTerminals",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List valid departing terminals for a trip date.",
});

export const fetchTerminalsAndMates = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTerminalsGroup,
  functionName: "fetchTerminalsAndMates",
  endpoint: "/terminalsandmates/{TripDate}",
  inputSchema: terminalsAndMatesInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List all valid terminal pairs for a trip date.",
});

export const fetchTerminalsAndMatesByRoute = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTerminalsGroup,
  functionName: "fetchTerminalsAndMatesByRoute",
  endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
  inputSchema: terminalsAndMatesByRouteInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription:
    "List valid terminal pairs for a specific route and trip date.",
});
