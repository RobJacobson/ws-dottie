import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchRoutesByTripDateAndTerminals: FetchFactory<
  RoutesByTripDateAndTerminalsInput,
  Route[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: routesByTripDateAndTerminalsMeta,
});

/**
 * React Query hook for retrieving routes matching terminal pair for specified date
 */
export const useRoutesByTripDateAndTerminals: HookFactory<
  RoutesByTripDateAndTerminalsInput,
  Route[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: routesByTripDateAndTerminalsMeta.functionName,
  fetchFn: fetchRoutesByTripDateAndTerminals,
  cacheStrategy: routesGroup.cacheStrategy,
});
