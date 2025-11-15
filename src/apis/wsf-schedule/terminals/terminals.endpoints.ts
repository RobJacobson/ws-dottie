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
    resourceDescription:
      "Terminals represent the ferry dock locations where passengers board and disembark, including terminal identification, location information, and service details.",
    businessContext: "",
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
  endpointDescription: "Returns all terminals for the specified trip date.",
});

export const fetchTerminalsAndMates = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTerminalsGroup,
  functionName: "fetchTerminalsAndMates",
  endpoint: "/terminalsandmates/{TripDate}",
  inputSchema: terminalsAndMatesInputSchema,
  outputSchema: terminalMateSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "Returns all terminals with their mates for the specified trip date.",
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
    "Returns terminals and their mates for the specified trip date and route.",
});
