import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
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
  type RouteDetailsByTripDateInput,
  routeDetailsByTripDateInputSchema,
} from "./shared/routeDetails.input";
import {
  type RouteDetail,
  routeDetailSchema,
} from "./shared/routeDetails.output";

/**
 * Metadata for the fetchRouteDetailsByTripDate endpoint
 */
export const routeDetailsByTripDateMeta = {
  functionName: "fetchRouteDetailsByTripDate",
  endpoint: "/routedetails/{TripDate}",
  inputSchema: routeDetailsByTripDateInputSchema,
  outputSchema: routeDetailSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "List detailed route information for all routes on specified date.",
} satisfies EndpointMeta<RouteDetailsByTripDateInput, RouteDetail[]>;

/**
 * Fetch function for retrieving detailed route information for all routes on specified date
 */
export const fetchRouteDetailsByTripDate: (
  params?: FetchFunctionParams<RouteDetailsByTripDateInput>
) => Promise<RouteDetail[]> = createFetchFunction(
  wsfScheduleApi,
  routeDetailsGroup,
  routeDetailsByTripDateMeta
);

/**
 * React Query hook for retrieving detailed route information for all routes on specified date
 */
export const useRouteDetailsByTripDate: (
  params?: FetchFunctionParams<RouteDetailsByTripDateInput>,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error> = createHook(
  wsfScheduleApi,
  routeDetailsGroup,
  routeDetailsByTripDateMeta
);
