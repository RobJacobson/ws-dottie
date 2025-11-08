import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { routeDetailsResource } from "./routeDetails.endpoints";
import * as fetchFunctions from "./routeDetails.fetch";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails.input";
import type { RouteDetail } from "./routeDetails.output";

const hooks = createHooks(wsfScheduleApi, routeDetailsResource, fetchFunctions);

export const useRouteDetailsByTripDate: (
  params?: FetchFunctionParams<RouteDetailsByTripDateInput>,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error> = hooks.useRouteDetailsByTripDate;

export const useRouteDetailsByTripDateAndRouteId: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndRouteIdInput>,
  options?: QueryHookOptions<RouteDetail>
) => UseQueryResult<RouteDetail, Error> =
  hooks.useRouteDetailsByTripDateAndRouteId;

export const useRouteDetailsByTripDateAndTerminals: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error> =
  hooks.useRouteDetailsByTripDateAndTerminals;
