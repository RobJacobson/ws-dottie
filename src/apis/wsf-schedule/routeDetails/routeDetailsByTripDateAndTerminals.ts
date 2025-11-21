import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for route details by trip date and terminals
 */
const routeDetailsByTripDateAndTerminalsFactory = createFetchAndHook<
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetail[]
>({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateAndTerminalsMeta,
  getEndpointGroup: () =>
    require("./shared/routeDetails.endpoints").routeDetailsGroup,
});

/**
 * Fetch function and React Query hook for retrieving detailed route information for terminal pair on date
 */
export const {
  fetch: fetchRouteDetailsByTripDateAndTerminals,
  hook: useRouteDetailsByTripDateAndTerminals,
} = routeDetailsByTripDateAndTerminalsFactory;
