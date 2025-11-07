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

export const fetchRouteDetailsByTripDate: (
  params?: FetchFunctionParams<RouteDetailsByTripDateInput>
) => Promise<RouteDetail[]> = fetchFunctions.fetchRouteDetailsByTripDate;

export const fetchRouteDetailsByTripDateAndRouteId: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndRouteIdInput>
) => Promise<RouteDetail> = fetchFunctions.fetchRouteDetailsByTripDateAndRouteId;

export const fetchRouteDetailsByTripDateAndTerminals: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndTerminalsInput>
) => Promise<RouteDetail[]> = fetchFunctions.fetchRouteDetailsByTripDateAndTerminals;
