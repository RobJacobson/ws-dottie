import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchRouteDetailsByTripDateAndTerminals: FetchFactory<
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetail[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateAndTerminalsMeta,
});

/**
 * React Query hook for retrieving detailed route information for terminal pair on date
 */
export const useRouteDetailsByTripDateAndTerminals: HookFactory<
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetail[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: routeDetailsByTripDateAndTerminalsMeta.functionName,
  fetchFn: fetchRouteDetailsByTripDateAndTerminals,
  cacheStrategy: routeDetailsGroup.cacheStrategy,
});
