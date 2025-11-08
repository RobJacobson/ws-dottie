import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { routeDetailsResource } from "./routeDetails.endpoints";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails.input";
import type { RouteDetail } from "./routeDetails.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  routeDetailsResource
);

export const fetchRouteDetailsByTripDate: (
  params?: FetchFunctionParams<RouteDetailsByTripDateInput>
) => Promise<RouteDetail[]> = fetchFunctions.fetchRouteDetailsByTripDate;

export const fetchRouteDetailsByTripDateAndRouteId: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndRouteIdInput>
) => Promise<RouteDetail> =
  fetchFunctions.fetchRouteDetailsByTripDateAndRouteId;

export const fetchRouteDetailsByTripDateAndTerminals: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndTerminalsInput>
) => Promise<RouteDetail[]> =
  fetchFunctions.fetchRouteDetailsByTripDateAndTerminals;
