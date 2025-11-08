import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails.input";
import {
  routeDetailsByTripDateAndRouteIdInputSchema,
  routeDetailsByTripDateAndTerminalsInputSchema,
  routeDetailsByTripDateInputSchema,
} from "./routeDetails.input";
import type { RouteDetail } from "./routeDetails.output";
import { routeDetailSchema } from "./routeDetails.output";

export const routeDetailsResource = {
  name: "route-details",
  documentation: {
    resourceDescription:
      "Each RouteDetails item represents a ferry route with complete service information. Each route includes departure and arrival terminals, sailing times, vessel assignments, and route-specific details for travel planning.",
    businessContext:
      "Use to plan ferry travel by providing comprehensive route information including terminals, schedules, and vessel details for trip planning and navigation.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchRouteDetailsByTripDate: {
      endpoint: "/routedetails/{TripDate}",
      inputSchema: routeDetailsByTripDateInputSchema,
      outputSchema: z.array(routeDetailSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns multiple of RouteDetails for specified date.",
    } satisfies EndpointDefinition<RouteDetailsByTripDateInput, RouteDetail[]>,
    fetchRouteDetailsByTripDateAndRouteId: {
      endpoint: "/routedetails/{TripDate}/{RouteID}",
      inputSchema: routeDetailsByTripDateAndRouteIdInputSchema,
      outputSchema: routeDetailSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
      endpointDescription:
        "Returns single of RouteDetails for specified route.",
    } satisfies EndpointDefinition<
      RouteDetailsByTripDateAndRouteIdInput,
      RouteDetail
    >,
    fetchRouteDetailsByTripDateAndTerminals: {
      endpoint:
        "/routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: routeDetailsByTripDateAndTerminalsInputSchema,
      outputSchema: z.array(routeDetailSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription:
        "Returns multiple of RouteDetails for terminal pair.",
    } satisfies EndpointDefinition<
      RouteDetailsByTripDateAndTerminalsInput,
      RouteDetail[]
    >,
  },
} satisfies EndpointGroup;
