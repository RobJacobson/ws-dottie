import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Routes represent the ferry paths between terminals, including route identification, terminal connections, and route-specific scheduling information.";

export const routesResource = {
  name: "routes",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byTripDate: {
      function: "getRoutesByTripDate",
      endpoint: "/routes/{TripDate}",
      inputSchema: i.routesSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns all routes for the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.RoutesInput, o.Route[]>,
    byTripDateAndTerminals: {
      function: "getRoutesByTripDateAndTerminals",
      endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routesByTerminalsSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
      description: `Returns routes for the specified trip date and terminal pair. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.RoutesByTerminalsInput, o.Route[]>,
  },
};
