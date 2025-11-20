import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import { routeDetailsGroup } from "./shared/routeDetails.endpoints";
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
 * Fetch function for retrieving detailed route information for specific route on date
 */
export const fetchRouteDetailsByTripDateAndRouteId: FetchFactory<
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetail
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateAndRouteIdMeta,
});

/**
 * React Query hook for retrieving detailed route information for specific route on date
 */
export const useRouteDetailsByTripDateAndRouteId: HookFactory<
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetail
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: routeDetailsByTripDateAndRouteIdMeta.functionName,
  fetchFn: fetchRouteDetailsByTripDateAndRouteId,
  cacheStrategy: routeDetailsGroup.cacheStrategy,
});
