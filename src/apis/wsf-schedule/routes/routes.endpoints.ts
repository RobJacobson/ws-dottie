import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./routes.input";
import * as o from "./routes.output";

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
      inputSchema: i.routesByTripDateInputSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription: "Returns multiple of Routes for specified date.",
    } satisfies EndpointDefinition<i.RoutesByTripDateInput, o.Route[]>,
    getRoutesByTripDateAndTerminals: {
      function: "getRoutesByTripDateAndTerminals",
      endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routesByTripDateAndTerminalsInputSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription: "Returns multiple of Routes for terminal pair.",
    } satisfies EndpointDefinition<
      i.RoutesByTripDateAndTerminalsInput,
      o.Route[]
    >,
  },
} satisfies EndpointGroup;
