import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { routeDetailsResource } from "./routeDetails.endpoints";
import * as fetchFunctions from "./routeDetails.fetch";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails.input";
import type { RouteDetail } from "./routeDetails.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  routeDetailsResource,
  fetchFunctions
);

export const useRouteDetailsByTripDate: (
  params?: RouteDetailsByTripDateInput,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error> = hooks.useRouteDetailsByTripDate;

export const useRouteDetailsByTripDateAndRouteId: (
  params?: RouteDetailsByTripDateAndRouteIdInput,
  options?: QueryHookOptions<RouteDetail>
) => UseQueryResult<RouteDetail, Error> = hooks.useRouteDetailsByTripDateAndRouteId;

export const useRouteDetailsByTripDateAndTerminals: (
  params?: RouteDetailsByTripDateAndTerminalsInput,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error> = hooks.useRouteDetailsByTripDateAndTerminals;
