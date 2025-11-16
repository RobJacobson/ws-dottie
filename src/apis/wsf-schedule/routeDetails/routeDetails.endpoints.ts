import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
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
    summary: "Detailed ferry route information with service details.",
    description:
      "Comprehensive route data including terminals, crossing times, vessel assignments, alerts, and route-specific notes for trip planning.",
    useCases: [
      "Display detailed route information for trip planning.",
      "Show route alerts and service disruptions.",
      "Access route-specific notes and accessibility information.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchRouteDetailsByTripDate = createEndpoint({
  api: apis.wsfSchedule,
  group: routeDetailsGroup,
  functionName: "fetchRouteDetailsByTripDate",
  endpoint: "/routedetails/{TripDate}",
  inputSchema: routeDetailsByTripDateInputSchema,
  outputSchema: routeDetailSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "List detailed route information for all routes on specified date.",
});

export const fetchRouteDetailsByTripDateAndRouteId = createEndpoint({
  api: apis.wsfSchedule,
  group: routeDetailsGroup,
  functionName: "fetchRouteDetailsByTripDateAndRouteId",
  endpoint: "/routedetails/{TripDate}/{RouteID}",
  inputSchema: routeDetailsByTripDateAndRouteIdInputSchema,
  outputSchema: routeDetailSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
  endpointDescription:
    "Get detailed route information for specific route on date.",
});

export const fetchRouteDetailsByTripDateAndTerminals = createEndpoint({
  api: apis.wsfSchedule,
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
  endpointDescription:
    "List detailed route information for terminal pair on date.",
});
