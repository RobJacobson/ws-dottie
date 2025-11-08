import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
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
