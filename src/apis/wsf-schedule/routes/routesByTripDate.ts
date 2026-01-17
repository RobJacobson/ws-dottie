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
  toolDescription: {
    purpose:
      "List basic route identification and service disruption information for all routes operating on a specific trip date.",
    useWhen: [
      "discovering available RouteIDs for a date",
      "building route selection interfaces",
      "checking for service disruptions across all routes",
    ],
    avoidWhen: [
      "you need detailed route information (prefer fetchRouteDetailsByTripDate)",
      "you need routes for specific terminals (prefer fetchRoutesByTripDateAndTerminals)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
    ],
    returns: "array — one item per route operating on trip date",
    outputHighlights: [
      "IDs: RouteID, RegionID",
      "Names: RouteAbbrev, Description",
      "Service status: ServiceDisruptions array with BulletinID, BulletinFlag, PublishDate, DisruptionDescription",
    ],
    chaining: [
      "fetchRoutesByTripDate → extract RouteID → call fetchRouteDetailsByTripDateAndRouteId with { RouteID: ..., TripDate: ... }",
      "fetchRoutesByTripDate → extract RouteID → call fetchSailingsByRouteID with { RouteID: ... }",
    ],
  },
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
