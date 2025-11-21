import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type RoutesByTripDateAndTerminalsInput,
  routesByTripDateAndTerminalsInputSchema,
} from "./shared/routes.input";
import { type Route, routeSchema } from "./shared/routes.output";

/**
 * Metadata for the fetchRoutesByTripDateAndTerminals endpoint
 */
export const routesByTripDateAndTerminalsMeta = {
  functionName: "fetchRoutesByTripDateAndTerminals",
  endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: routesByTripDateAndTerminalsInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription: "List routes matching terminal pair for specified date.",
} satisfies EndpointMeta<RoutesByTripDateAndTerminalsInput, Route[]>;

/**
 * Factory result for routes by trip date and terminals
 */
const routesByTripDateAndTerminalsFactory = createFetchAndHook<
  RoutesByTripDateAndTerminalsInput,
  Route[]
>({
  api: wsfScheduleApiMeta,
  endpoint: routesByTripDateAndTerminalsMeta,
  getEndpointGroup: () => require("./shared/routes.endpoints").routesGroup,
});

/**
 * Fetch function and React Query hook for retrieving routes matching terminal pair for specified date
 */
export const {
  fetch: fetchRoutesByTripDateAndTerminals,
  hook: useRoutesByTripDateAndTerminals,
} = routesByTripDateAndTerminalsFactory;
