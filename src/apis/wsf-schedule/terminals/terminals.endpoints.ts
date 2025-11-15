import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
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

export const fetchTerminals = defineEndpoint({
  api: apis.wsfSchedule,
  group: scheduleTerminalsGroup,
  functionName: "fetchTerminals",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "Returns all terminals for the specified trip date.",
});

export const fetchTerminalsAndMates = defineEndpoint({
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

export const fetchTerminalsAndMatesByRoute = defineEndpoint({
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
