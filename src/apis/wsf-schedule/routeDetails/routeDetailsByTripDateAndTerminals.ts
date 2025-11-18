import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { routeDetailsGroup } from "./shared/routeDetails.endpoints";
import {
  type RouteDetailsByTripDateAndTerminalsInput,
  routeDetailsByTripDateAndTerminalsInputSchema,
} from "./shared/routeDetails.input";
import {
  type RouteDetail,
  routeDetailSchema,
} from "./shared/routeDetails.output";

/**
 * Metadata for the fetchRouteDetailsByTripDateAndTerminals endpoint
 */
export const routeDetailsByTripDateAndTerminalsMeta = {
  functionName: "fetchRouteDetailsByTripDateAndTerminals",
  endpoint:
    "/routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: routeDetailsByTripDateAndTerminalsInputSchema,
  outputSchema: routeDetailSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription:
    "List detailed route information for terminal pair on date.",
} satisfies EndpointMeta<
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetail[]
>;

/**
 * Fetch function for retrieving detailed route information for terminal pair on date
 */
export const fetchRouteDetailsByTripDateAndTerminals: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndTerminalsInput>
) => Promise<RouteDetail[]> = createFetchFunction(
  wsfScheduleApi.api,
  routeDetailsGroup,
  routeDetailsByTripDateAndTerminalsMeta
);

/**
 * React Query hook for retrieving detailed route information for terminal pair on date
 */
export const useRouteDetailsByTripDateAndTerminals: (
  params?: FetchFunctionParams<RouteDetailsByTripDateAndTerminalsInput>,
  options?: QueryHookOptions<RouteDetail[]>
) => UseQueryResult<RouteDetail[], Error> = createHook(
  wsfScheduleApi.api,
  routeDetailsGroup,
  routeDetailsByTripDateAndTerminalsMeta
);
