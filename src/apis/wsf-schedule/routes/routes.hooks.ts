import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { routesResource } from "./routes.endpoints";
import * as fetchFunctions from "./routes.fetch";
import type {
  RoutesByTripDateAndTerminalsInput,
  RoutesByTripDateInput,
} from "./routes.input";
import type { Route } from "./routes.output";

const hooks = createHooks(wsfScheduleApi, routesResource, fetchFunctions);

export const useRoutesByTripDate: (
  params?: FetchFunctionParams<RoutesByTripDateInput>,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error> = hooks.useRoutesByTripDate;

export const useRoutesByTripDateAndTerminals: (
  params?: FetchFunctionParams<RoutesByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error> = hooks.useRoutesByTripDateAndTerminals;
