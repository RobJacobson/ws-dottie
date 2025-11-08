import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { routesResource } from "./routes.endpoints";
import * as fetchFunctions from "./routes.fetch";
import type {
  RoutesByTripDateAndTerminalsInput,
  RoutesByTripDateInput,
} from "./routes.input";
import type { Route } from "./routes.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  routesResource,
  fetchFunctions
);

export const useRoutesByTripDate: (
  params?: RoutesByTripDateInput,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error> = hooks.useRoutesByTripDate;

export const useRoutesByTripDateAndTerminals: (
  params?: RoutesByTripDateAndTerminalsInput,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error> = hooks.useRoutesByTripDateAndTerminals;
