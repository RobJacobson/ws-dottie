import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
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
export const fetchRouteDetailsByTripDateAndRouteId: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndRouteIdInput>
) => Promise<RouteDetail> = createFetchFunction(
  apis.wsfSchedule,
  routeDetailsGroup,
  routeDetailsByTripDateAndRouteIdMeta
);

/**
 * React Query hook for retrieving detailed route information for specific route on date
 */
export const useRouteDetailsByTripDateAndRouteId: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndRouteIdInput>,
  options?: QueryHookOptions<RouteDetail>
) => UseQueryResult<RouteDetail, Error> = createHook(
  apis.wsfSchedule,
  routeDetailsGroup,
  routeDetailsByTripDateAndRouteIdMeta
);
