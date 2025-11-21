import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for route details by trip date
 */
const routeDetailsByTripDateFactory = createFetchAndHook<
  RouteDetailsByTripDateInput,
  RouteDetail[]
>({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateMeta,
  getEndpointGroup: () =>
    require("./shared/routeDetails.endpoints").routeDetailsGroup,
});

/**
 * Fetch function and React Query hook for retrieving detailed route information for all routes on specified date
 */
export const {
  fetch: fetchRouteDetailsByTripDate,
  hook: useRouteDetailsByTripDate,
} = routeDetailsByTripDateFactory;
