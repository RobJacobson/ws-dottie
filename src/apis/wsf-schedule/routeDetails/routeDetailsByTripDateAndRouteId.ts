import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type RouteDetailsByTripDateAndRouteIdInput,
  routeDetailsByTripDateAndRouteIdInputSchema,
} from "./shared/routeDetails.input";
import {
  type RouteDetail,
  routeDetailSchema,
} from "./shared/routeDetails.output";

/**
 * Metadata for the fetchRouteDetailsByTripDateAndRouteId endpoint
 */
export const routeDetailsByTripDateAndRouteIdMeta = {
  functionName: "fetchRouteDetailsByTripDateAndRouteId",
  endpoint: "/routedetails/{TripDate}/{RouteID}",
  inputSchema: routeDetailsByTripDateAndRouteIdInputSchema,
  outputSchema: routeDetailSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
  endpointDescription:
    "Get detailed route information for specific route on date.",
} satisfies EndpointMeta<RouteDetailsByTripDateAndRouteIdInput, RouteDetail>;

/**
 * Factory result for route details by trip date and route ID
 */
const routeDetailsByTripDateAndRouteIdFactory = createFetchAndHook<
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetail
>({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateAndRouteIdMeta,
  getEndpointGroup: () =>
    require("./shared/routeDetails.endpoints").routeDetailsGroup,
});

/**
 * Fetch function and React Query hook for retrieving detailed route information for specific route on date
 */
export const {
  fetch: fetchRouteDetailsByTripDateAndRouteId,
  hook: useRouteDetailsByTripDateAndRouteId,
} = routeDetailsByTripDateAndRouteIdFactory;
