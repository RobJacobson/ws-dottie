import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type RouteDetailsByTripDateAndRouteIdInput,
  routeDetailsByTripDateAndRouteIdInputSchema,
} from "./shared/routeDetails.input";
import {
  type RouteDetail,
  routeDetailSchema,
} from "./shared/routeDetails.output";

/**
 * Metadata for the fetchRouteDetailsByTripDateAndRouteId endpoint
 */
export const routeDetailsByTripDateAndRouteIdMeta = {
  functionName: "fetchRouteDetailsByTripDateAndRouteId",
  endpoint: "/routedetails/{TripDate}/{RouteID}",
  inputSchema: routeDetailsByTripDateAndRouteIdInputSchema,
  outputSchema: routeDetailSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
  endpointDescription:
    "Get detailed route information for specific route on date.",
  toolDescription: {
    purpose:
      "Get comprehensive route details for a specific route on a specific trip date.",
    useWhen: [
      "accessing detailed information for one route",
      "checking route-specific alerts and accessibility",
      "getting reservation requirements for a specific route",
    ],
    avoidWhen: [
      "you need details for multiple routes (prefer fetchRouteDetailsByTripDate)",
      "you don't know the RouteID (prefer fetchRouteDetailsByTripDate then filter)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
      "RouteID: from fetchRoutesByTripDate → RouteID",
    ],
    returns: "object — detailed information for single route",
    outputHighlights: [
      "IDs: RouteID, RegionID, VesselWatchID",
      "Names: RouteAbbrev, Description",
      "Route characteristics: ReservationFlag, InternationalFlag, PassengerOnlyFlag",
      "Timing: CrossingTime (estimated minutes)",
      "Accessibility: AdaNotes (HTML accessibility information)",
      "Information: GeneralRouteNotes, SeasonalRouteNotes (HTML-formatted route info)",
      "Alerts: Alerts array with BulletinID, AlertDescription, AlertFullText (HTML), PublishDate",
      "Large text fields: AdaNotes, GeneralRouteNotes, SeasonalRouteNotes, AlertFullText may be lengthy HTML",
    ],
    chaining: [
      "fetchRoutesByTripDate → extract RouteID → call fetchRouteDetailsByTripDateAndRouteId with { RouteID: ..., TripDate: ... }",
      "fetchRouteDetailsByTripDate → extract RouteID → call fetchRouteDetailsByTripDateAndRouteId with { RouteID: ..., TripDate: ... }",
    ],
  },
} satisfies EndpointMeta<RouteDetailsByTripDateAndRouteIdInput, RouteDetail>;

/**
 * Factory result for route details by trip date and route ID
 */
const routeDetailsByTripDateAndRouteIdFactory = createFetchAndHook<
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetail
>({
  api: wsfScheduleApiMeta,
  endpoint: routeDetailsByTripDateAndRouteIdMeta,
  getEndpointGroup: () =>
    require("./shared/routeDetails.endpoints").routeDetailsGroup,
});

/**
 * Fetch function and React Query hook for retrieving detailed route information for specific route on date
 */
export const {
  fetch: fetchRouteDetailsByTripDateAndRouteId,
  hook: useRouteDetailsByTripDateAndRouteId,
} = routeDetailsByTripDateAndRouteIdFactory;
