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
import { routesGroup } from "./shared/routes.endpoints";
import {
  type RoutesByTripDateAndTerminalsInput,
  routesByTripDateAndTerminalsInputSchema,
} from "./shared/routes.input";
import { type Route, routeSchema } from "./shared/routes.output";

/**
 * Metadata for the fetchRoutesByTripDateAndTerminals endpoint
 */
export const routesByTripDateAndTerminalsMeta = {
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
} satisfies EndpointMeta<RoutesByTripDateAndTerminalsInput, Route[]>;

/**
 * Fetch function for retrieving routes matching terminal pair for specified date
 */
export const fetchRoutesByTripDateAndTerminals: (
  params?: FetchFunctionParams<RoutesByTripDateAndTerminalsInput>
) => Promise<Route[]> = createFetchFunction(
  apis.wsfSchedule,
  routesGroup,
  routesByTripDateAndTerminalsMeta
);

/**
 * React Query hook for retrieving routes matching terminal pair for specified date
 */
export const useRoutesByTripDateAndTerminals: (
  params?: FetchFunctionParams<RoutesByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error> = createHook(
  apis.wsfSchedule,
  routesGroup,
  routesByTripDateAndTerminalsMeta
);
