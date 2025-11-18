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
import { routesGroup } from "./shared/routes.endpoints";
import {
  type RoutesByTripDateInput,
  routesByTripDateInputSchema,
} from "./shared/routes.input";
import { type Route, routeSchema } from "./shared/routes.output";

/**
 * Metadata for the fetchRoutesByTripDate endpoint
 */
export const routesByTripDateMeta = {
  functionName: "fetchRoutesByTripDate",
  endpoint: "/routes/{TripDate}",
  inputSchema: routesByTripDateInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List all routes available for specified trip date.",
} satisfies EndpointMeta<RoutesByTripDateInput, Route[]>;

/**
 * Fetch function for retrieving all routes available for specified trip date
 */
export const fetchRoutesByTripDate: (
  params?: FetchFunctionParams<RoutesByTripDateInput>
) => Promise<Route[]> = createFetchFunction(
  wsfScheduleApi.api,
  routesGroup,
  routesByTripDateMeta
);

/**
 * React Query hook for retrieving all routes available for specified trip date
 */
export const useRoutesByTripDate: (
  params?: FetchFunctionParams<RoutesByTripDateInput>,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error> = createHook(
  wsfScheduleApi.api,
  routesGroup,
  routesByTripDateMeta
);
