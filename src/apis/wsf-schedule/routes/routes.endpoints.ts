import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  routesByTripDateAndTerminalsInputSchema,
  routesByTripDateInputSchema,
} from "./routes.input";
import { routeSchema } from "./routes.output";

export const routesGroup: EndpointGroup = {
  name: "routes",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each Routes item represents a ferry path between terminals. Each route includes route identification, terminal connections, and route-specific scheduling information for travel planning.",
    businessContext:
      "Use to identify ferry routes by providing route paths and terminal connections for travel planning and schedule selection.",
  },
};

export const fetchRoutesByTripDate = createEndpoint({
  api: apis.wsfSchedule,
  group: routesGroup,
  functionName: "fetchRoutesByTripDate",
  endpoint: "/routes/{TripDate}",
  inputSchema: routesByTripDateInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "Returns multiple of Routes for specified date.",
});

export const fetchRoutesByTripDateAndTerminals = createEndpoint({
  api: apis.wsfSchedule,
  group: routesGroup,
  functionName: "fetchRoutesByTripDateAndTerminals",
  endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: routesByTripDateAndTerminalsInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription: "Returns multiple of Routes for terminal pair.",
});
