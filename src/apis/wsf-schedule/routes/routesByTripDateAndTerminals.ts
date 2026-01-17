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
  toolDescription: {
    purpose:
      "List basic route information for routes connecting specific departing and arriving terminals on a trip date.",
    useWhen: [
      "finding route options between known terminals",
      "getting RouteID for terminal-to-terminal travel",
      "checking service disruptions for specific routes",
    ],
    avoidWhen: [
      "you need all routes for a date (prefer fetchRoutesByTripDate)",
      "you need detailed route information (prefer fetchRouteDetailsByTripDateAndTerminals)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
      "DepartingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "ArrivingTerminalID: from fetchTerminalsAndMates → TerminalID",
    ],
    returns: "array — routes connecting the terminal pair (typically 1 item)",
    outputHighlights: [
      "IDs: RouteID, RegionID",
      "Names: RouteAbbrev, Description",
      "Service status: ServiceDisruptions array with BulletinID, BulletinFlag, PublishDate, DisruptionDescription",
    ],
    chaining: [
      "fetchTerminalsAndMates → extract DepartingTerminalID, ArrivingTerminalID → call fetchRoutesByTripDateAndTerminals with { DepartingTerminalID: ..., ArrivingTerminalID: ..., TripDate: ... }",
      "fetchRoutesByTripDateAndTerminals → extract RouteID → call fetchRouteDetailsByTripDateAndTerminals with { RouteID: ..., TripDate: ..., DepartingTerminalID: ..., ArrivingTerminalID: ... }",
    ],
  },
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
