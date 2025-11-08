import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { routesResource } from "./routes.endpoints";
import type {
  RoutesByTripDateAndTerminalsInput,
  RoutesByTripDateInput,
} from "./routes.input";
import type { Route } from "./routes.output";

const fetchFunctions = createFetchFunctions(wsfScheduleApi, routesResource);

export const fetchRoutesByTripDate: (
  params?: FetchFunctionParams<RoutesByTripDateInput>
) => Promise<Route[]> = fetchFunctions.fetchRoutesByTripDate;

export const fetchRoutesByTripDateAndTerminals: (
  params?: FetchFunctionParams<RoutesByTripDateAndTerminalsInput>
) => Promise<Route[]> = fetchFunctions.fetchRoutesByTripDateAndTerminals;
