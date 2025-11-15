import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import type { EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import {
  routeDetailsByTripDateAndRouteIdInputSchema,
  routeDetailsByTripDateAndTerminalsInputSchema,
  routeDetailsByTripDateInputSchema,
} from "./routeDetails.input";
import { routeDetailSchema } from "./routeDetails.output";

export const routeDetailsGroup: EndpointGroup = {
  name: "route-details",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each RouteDetails item represents a ferry route with complete service information. Each route includes departure and arrival terminals, sailing times, vessel assignments, and route-specific details for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing comprehensive route information including terminals, schedules, and vessel details for trip planning and navigation.",
  },
};

export const fetchRouteDetailsByTripDate = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: routeDetailsGroup,
  functionName: "fetchRouteDetailsByTripDate",
  endpoint: "/routedetails/{TripDate}",
  inputSchema: routeDetailsByTripDateInputSchema,
  outputSchema: routeDetailSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "Returns multiple of RouteDetails for specified date.",
});

export const fetchRouteDetailsByTripDateAndRouteId = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: routeDetailsGroup,
  functionName: "fetchRouteDetailsByTripDateAndRouteId",
  endpoint: "/routedetails/{TripDate}/{RouteID}",
  inputSchema: routeDetailsByTripDateAndRouteIdInputSchema,
  outputSchema: routeDetailSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
  endpointDescription: "Returns single of RouteDetails for specified route.",
});

export const fetchRouteDetailsByTripDateAndTerminals = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: routeDetailsGroup,
  functionName: "fetchRouteDetailsByTripDateAndTerminals",
  endpoint:
    "/routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: routeDetailsByTripDateAndTerminalsInputSchema,
  outputSchema: routeDetailSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription: "Returns multiple of RouteDetails for terminal pair.",
});
