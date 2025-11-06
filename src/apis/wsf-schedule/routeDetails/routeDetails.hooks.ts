import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useRouteDetailsByTripDate = hooks.useRouteDetailsByTripDate as (
  params?: RouteDetailsByTripDateInput,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error>;

export const useRouteDetailsByTripDateAndRouteId =
  hooks.useRouteDetailsByTripDateAndRouteId as (
    params?: RouteDetailsByTripDateAndRouteIdInput,
    options?: QueryHookOptions<RouteDetail>
  ) => UseQueryResult<RouteDetail, Error>;

export const useRouteDetailsByTripDateAndTerminals =
  hooks.useRouteDetailsByTripDateAndTerminals as (
    params?: RouteDetailsByTripDateAndTerminalsInput,
    options?: QueryHookOptions<RouteDetail[]>
  ) => UseQueryResult<RouteDetail[], Error>;
