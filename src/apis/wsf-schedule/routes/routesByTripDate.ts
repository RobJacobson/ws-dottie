import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type RoutesByTripDateInput,
  routesByTripDateInputSchema,
} from "./shared/routes.input";
import { type Route, routeSchema } from "./shared/routes.output";

/**
 * Metadata for the fetchRoutesByTripDate endpoint
 */
export const routesByTripDateMeta = {
  functionName: "fetchRoutesByTripDate",
  endpoint: "/routes/{TripDate}",
  inputSchema: routesByTripDateInputSchema,
  outputSchema: routeSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription: "List all routes available for specified trip date.",
} satisfies EndpointMeta<RoutesByTripDateInput, Route[]>;

/**
 * Factory result for routes by trip date
 */
const routesByTripDateFactory = createFetchAndHook<
  RoutesByTripDateInput,
  Route[]
>({
  api: wsfScheduleApiMeta,
  endpoint: routesByTripDateMeta,
  getEndpointGroup: () => require("./shared/routes.endpoints").routesGroup,
});

/**
 * Fetch function and React Query hook for retrieving all routes available for specified trip date
 */
export const { fetch: fetchRoutesByTripDate, hook: useRoutesByTripDate } =
  routesByTripDateFactory;
