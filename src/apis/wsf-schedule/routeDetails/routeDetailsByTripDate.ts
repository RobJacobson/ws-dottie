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
  type RouteDetailsByTripDateInput,
  routeDetailsByTripDateInputSchema,
} from "./shared/routeDetails.input";
import {
  type RouteDetail,
  routeDetailSchema,
} from "./shared/routeDetails.output";

/**
 * Metadata for the fetchRouteDetailsByTripDate endpoint
 */
export const routeDetailsByTripDateMeta = {
  functionName: "fetchRouteDetailsByTripDate",
  endpoint: "/routedetails/{TripDate}",
  inputSchema: routeDetailsByTripDateInputSchema,
  outputSchema: routeDetailSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "List detailed route information for all routes on specified date.",
} satisfies EndpointMeta<RouteDetailsByTripDateInput, RouteDetail[]>;

/**
 * Fetch function for retrieving detailed route information for all routes on specified date
 */
export const fetchRouteDetailsByTripDate: FetchFactory<
  RouteDetailsByTripDateInput,
  RouteDetail[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateMeta,
});

/**
 * React Query hook for retrieving detailed route information for all routes on specified date
 */
export const useRouteDetailsByTripDate: HookFactory<
  RouteDetailsByTripDateInput,
  RouteDetail[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: routeDetailsByTripDateMeta.functionName,
  fetchFn: fetchRouteDetailsByTripDate,
  cacheStrategy: routeDetailsGroup.cacheStrategy,
});
