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
export const fetchRoutesByTripDate: FetchFactory<
  RoutesByTripDateInput,
  Route[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: routesByTripDateMeta,
});

/**
 * React Query hook for retrieving all routes available for specified trip date
 */
export const useRoutesByTripDate: HookFactory<RoutesByTripDateInput, Route[]> =
  createHook({
    apiName: wsfScheduleApiMeta.name,
    endpointName: routesByTripDateMeta.functionName,
    fetchFn: fetchRoutesByTripDate,
    cacheStrategy: routesGroup.cacheStrategy,
  });
