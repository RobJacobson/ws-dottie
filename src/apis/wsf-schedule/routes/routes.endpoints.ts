import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApi } from "../apiDefinition";
import {
  routesByTripDateAndTerminalsInputSchema,
  routesByTripDateInputSchema,
} from "./routes.input";
import { routeSchema } from "./routes.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "routes",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each Routes item represents a ferry path between terminals. Each route includes route identification, terminal connections, and route-specific scheduling information for travel planning.",
    businessContext:
      "Use to identify ferry routes by providing route paths and terminal connections for travel planning and schedule selection.",
  },
});

export const fetchRoutesByTripDate = defineEndpoint({
  group,
  functionName: "fetchRoutesByTripDate",
  definition: {
    endpoint: "/routes/{TripDate}",
    inputSchema: routesByTripDateInputSchema,
    outputSchema: routeSchema.array(),
    sampleParams: { TripDate: datesHelper.tomorrow() },
    endpointDescription: "Returns multiple of Routes for specified date.",
  },
});

export const fetchRoutesByTripDateAndTerminals = defineEndpoint({
  group,
  functionName: "fetchRoutesByTripDateAndTerminals",
  definition: {
    endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
    inputSchema: routesByTripDateAndTerminalsInputSchema,
    outputSchema: routeSchema.array(),
    sampleParams: {
      TripDate: datesHelper.tomorrow(),
      DepartingTerminalID: 1,
      ArrivingTerminalID: 10,
    },
    endpointDescription: "Returns multiple of Routes for terminal pair.",
  },
});

export const routesResource = group.descriptor;
