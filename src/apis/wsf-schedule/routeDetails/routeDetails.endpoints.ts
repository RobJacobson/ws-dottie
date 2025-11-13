import { datesHelper } from "@/shared/utils";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import {
  routeDetailsByTripDateAndRouteIdInputSchema,
  routeDetailsByTripDateAndTerminalsInputSchema,
  routeDetailsByTripDateInputSchema,
} from "./routeDetails.input";
import { routeDetailSchema } from "./routeDetails.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "route-details",
  documentation: {
    resourceDescription:
      "Each RouteDetails item represents a ferry route with complete service information. Each route includes departure and arrival terminals, sailing times, vessel assignments, and route-specific details for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing comprehensive route information including terminals, schedules, and vessel details for trip planning and navigation.",
  },
  cacheStrategy: "STATIC",
});

export const fetchRouteDetailsByTripDate = defineEndpoint({
  group,
  functionName: "fetchRouteDetailsByTripDate",
  definition: {
    endpoint: "/routedetails/{TripDate}",
    inputSchema: routeDetailsByTripDateInputSchema,
    outputSchema: routeDetailSchema.array(),
    sampleParams: { TripDate: datesHelper.tomorrow() },
    endpointDescription:
      "Returns multiple of RouteDetails for specified date.",
  },
});

export const fetchRouteDetailsByTripDateAndRouteId = defineEndpoint({
  group,
  functionName: "fetchRouteDetailsByTripDateAndRouteId",
  definition: {
    endpoint: "/routedetails/{TripDate}/{RouteID}",
    inputSchema: routeDetailsByTripDateAndRouteIdInputSchema,
    outputSchema: routeDetailSchema,
    sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
    endpointDescription:
      "Returns single of RouteDetails for specified route.",
  },
});

export const fetchRouteDetailsByTripDateAndTerminals = defineEndpoint({
  group,
  functionName: "fetchRouteDetailsByTripDateAndTerminals",
  definition: {
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
      "Returns multiple of RouteDetails for terminal pair.",
  },
});

export const routeDetailsResource = group.descriptor;
