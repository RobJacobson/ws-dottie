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
  toolDescription: {
    purpose:
      "List comprehensive route details for all routes operating on a specific trip date.",
    useWhen: [
      "discovering all available routes for a date",
      "accessing route alerts and seasonal notes",
      "planning multi-route travel",
      "checking reservation and accessibility requirements",
    ],
    avoidWhen: [
      "you only need basic route identification (prefer fetchRoutesByTripDate)",
      "you need details for one specific route (prefer fetchRouteDetailsByTripDateAndRouteId)",
    ],
    inputsHighlights:
      "TripDate (YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range)",
    returns: "array — one item per route operating on trip date",
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
  },
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
