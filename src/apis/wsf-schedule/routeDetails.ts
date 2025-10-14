import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Route details provide comprehensive information about ferry routes including departure and arrival terminals, sailing times, vessel assignments, and route-specific information.";

export const routeDetailsResource = {
  name: "route-details",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    byTripDate: {
      function: "getRouteDetailsByTripDate",
      endpoint: "/routedetails/{TripDate}",
      inputSchema: i.routeDetailsByTripDateSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns route details for the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateInput,
      o.RouteDetail[]
    >,
    byTripDateAndRouteId: {
      function: "getRouteDetailsByTripDateAndRouteId",
      endpoint: "/routedetails/{TripDate}/{RouteID}",
      inputSchema: i.routeDetailsByTripDateAndRouteIdSchema,
      outputSchema: o.routeDetailSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
      cacheStrategy: "STATIC",
      description: `Returns route details for the specified trip date and route ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndRouteIdInput,
      o.RouteDetail
    >,
    byTripDateAndTerminals: {
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
      cacheStrategy: "STATIC",
      description: `Returns route details for the specified trip date and terminal pair. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndTerminalsInput,
      o.RouteDetail[]
    >,
  },
};
