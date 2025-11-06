import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { routesResource } from "./routes.endpoints";
import type {
  RoutesByTripDateAndTerminalsInput,
  RoutesByTripDateInput,
} from "./routes.input";
import type { Route } from "./routes.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  routesResource
);

export const fetchRoutesByTripDate = fetchFunctions.fetchRoutesByTripDate as (
  params?: FetchFunctionParams<RoutesByTripDateInput>
) => Promise<Route[]>;

export const fetchRoutesByTripDateAndTerminals =
  fetchFunctions.fetchRoutesByTripDateAndTerminals as (
    params?: FetchFunctionParams<RoutesByTripDateAndTerminalsInput>
  ) => Promise<Route[]>;
