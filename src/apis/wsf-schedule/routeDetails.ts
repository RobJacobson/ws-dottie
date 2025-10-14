import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const routeDetailsResource = {
  name: "route-details",
  resourceDescription:
    "Route details provide comprehensive information about ferry routes including departure and arrival terminals, sailing times, vessel assignments, and route-specific information.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getRouteDetailsByTripDate: {
      function: "getRouteDetailsByTripDate",
      endpoint: "/routedetails/{TripDate}",
      inputSchema: i.routeDetailsByTripDateSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription: "Returns route details for the specified trip date.",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateInput,
      o.RouteDetail[]
    >,
    getRouteDetailsByTripDateAndRouteId: {
      function: "getRouteDetailsByTripDateAndRouteId",
      endpoint: "/routedetails/{TripDate}/{RouteID}",
      inputSchema: i.routeDetailsByTripDateAndRouteIdSchema,
      outputSchema: o.routeDetailSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
      endpointDescription:
        "Returns route details for the specified trip date and route ID.",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndRouteIdInput,
      o.RouteDetail
    >,
    getRouteDetailsByTripDateAndTerminals: {
      function: "getRouteDetailsByTripDateAndTerminals",
      endpoint:
        "/routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routeDetailsByTripDateAndTerminalsSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription:
        "Returns route details for the specified trip date and terminal pair.",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndTerminalsInput,
      o.RouteDetail[]
    >,
  },
};
