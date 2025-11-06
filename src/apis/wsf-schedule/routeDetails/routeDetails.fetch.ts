import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { routeDetailsResource } from "./routeDetails.endpoints";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails.input";
import type { RouteDetail } from "./routeDetails.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  routeDetailsResource
);

export const fetchRouteDetailsByTripDate =
  fetchFunctions.fetchRouteDetailsByTripDate as (
    params?: FetchFunctionParams<RouteDetailsByTripDateInput>
  ) => Promise<RouteDetail[]>;

export const fetchRouteDetailsByTripDateAndRouteId =
  fetchFunctions.fetchRouteDetailsByTripDateAndRouteId as (
    params?: FetchFunctionParams<RouteDetailsByTripDateAndRouteIdInput>
  ) => Promise<RouteDetail>;

export const fetchRouteDetailsByTripDateAndTerminals =
  fetchFunctions.fetchRouteDetailsByTripDateAndTerminals as (
    params?: FetchFunctionParams<RouteDetailsByTripDateAndTerminalsInput>
  ) => Promise<RouteDetail[]>;
