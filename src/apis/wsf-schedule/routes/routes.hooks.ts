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

export const useRoutesByTripDate = hooks.useRoutesByTripDate as (
  params?: RoutesByTripDateInput,
  options?: QueryHookOptions<Route[]>
) => UseQueryResult<Route[], Error>;

export const useRoutesByTripDateAndTerminals =
  hooks.useRoutesByTripDateAndTerminals as (
    params?: RoutesByTripDateAndTerminalsInput,
    options?: QueryHookOptions<Route[]>
  ) => UseQueryResult<Route[], Error>;
