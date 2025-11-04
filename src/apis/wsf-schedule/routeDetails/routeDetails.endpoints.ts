import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./routeDetails.input";
import * as o from "./routeDetails.output";

export const routeDetailsResource: EndpointGroup = {
  name: "route-details",
  documentation: {
    resourceDescription:
      "Each RouteDetails item represents a ferry route with complete service information. Each route includes departure and arrival terminals, sailing times, vessel assignments, and route-specific details for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing comprehensive route information including terminals, schedules, and vessel details for trip planning and navigation.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getRouteDetailsByTripDate: {
      function: "getRouteDetailsByTripDate",
      endpoint: "/routedetails/{TripDate}",
      inputSchema: i.routeDetailsByTripDateSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns multiple of RouteDetails for specified date.",
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
        "Returns single of RouteDetails for specified route.",
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
        "Returns multiple of RouteDetails for terminal pair.",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndTerminalsInput,
      o.RouteDetail[]
    >,
  },
};
