import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import type {
  RoutesByTripDateAndTerminalsInput,
  RoutesByTripDateInput,
} from "./routes.input";
import {
  routesByTripDateAndTerminalsInputSchema,
  routesByTripDateInputSchema,
} from "./routes.input";
import type { Route } from "./routes.output";
import { routeSchema } from "./routes.output";

export const routesResource = {
  name: "routes",
  documentation: {
    resourceDescription:
      "Each Routes item represents a ferry path between terminals. Each route includes route identification, terminal connections, and route-specific scheduling information for travel planning.",
    businessContext:
      "Use to identify ferry routes by providing route paths and terminal connections for travel planning and schedule selection.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getRoutesByTripDate: {
      function: "getRoutesByTripDate",
      endpoint: "/routes/{TripDate}",
      inputSchema: routesByTripDateInputSchema,
      outputSchema: z.array(routeSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription: "Returns multiple of Routes for specified date.",
    } satisfies EndpointDefinition<RoutesByTripDateInput, Route[]>,
    getRoutesByTripDateAndTerminals: {
      function: "getRoutesByTripDateAndTerminals",
      endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: routesByTripDateAndTerminalsInputSchema,
      outputSchema: z.array(routeSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription: "Returns multiple of Routes for terminal pair.",
    } satisfies EndpointDefinition<RoutesByTripDateAndTerminalsInput, Route[]>,
  },
} satisfies EndpointGroup;
