import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  routesByTripDateAndTerminalsInputSchema,
  routesByTripDateInputSchema,
} from "./routes.input";
import { routeSchema } from "./routes.output";

export const routesGroup: EndpointGroup = {
  name: "routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Basic ferry route information between terminals.",
    description:
      "Route identification including route IDs, abbreviations, descriptions, region associations, and service disruptions.",
    useCases: [
      "Discover available routes for a trip date.",
      "Identify routes by terminal combinations.",
      "Check for active service disruptions on routes.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchRoutesByTripDate = createEndpoint({
  api: apis.wsfSchedule,
  group: routesGroup,
  functionName: "fetchRoutesByTripDate",
  endpoint: "/routes/{TripDate}",
  inputSchema: routesByTripDateInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List all routes available for specified trip date.",
});

export const fetchRoutesByTripDateAndTerminals = createEndpoint({
  api: apis.wsfSchedule,
  group: routesGroup,
  functionName: "fetchRoutesByTripDateAndTerminals",
  endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: routesByTripDateAndTerminalsInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription: "List routes matching terminal pair for specified date.",
});
