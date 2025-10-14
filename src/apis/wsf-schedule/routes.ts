import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const routesResource = {
  name: "routes",
  resourceDescription:
    "Routes represent the ferry paths between terminals, including route identification, terminal connections, and route-specific scheduling information.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getRoutesByTripDate: {
      function: "getRoutesByTripDate",
      endpoint: "/routes/{TripDate}",
      inputSchema: i.routesSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription: "Returns all routes for the specified trip date.",
    } satisfies EndpointDefinition<i.RoutesInput, o.Route[]>,
    getRoutesByTripDateAndTerminals: {
      function: "getRoutesByTripDateAndTerminals",
      endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routesByTerminalsSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription:
        "Returns routes for the specified trip date and terminal pair.",
    } satisfies EndpointDefinition<i.RoutesByTerminalsInput, o.Route[]>,
  },
};
