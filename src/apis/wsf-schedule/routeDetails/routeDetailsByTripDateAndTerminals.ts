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
  toolDescription: {
    purpose:
      "Get detailed route information for routes connecting specific departing and arriving terminals on a trip date.",
    useWhen: [
      "planning travel between known terminals",
      "checking route options for a specific terminal pair",
      "getting alerts and notes for terminal-to-terminal routes",
    ],
    avoidWhen: [
      "you need routes for all terminals (prefer fetchRouteDetailsByTripDate)",
      "you don't know terminal IDs (prefer fetchTerminalsAndMates first)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
      "DepartingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "ArrivingTerminalID: from fetchTerminalsAndMates → TerminalID",
    ],
    returns: "array — routes connecting the terminal pair (typically 1 item)",
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
      "fetchTerminalsAndMates → extract DepartingTerminalID, ArrivingTerminalID → call fetchRouteDetailsByTripDateAndTerminals with { DepartingTerminalID: ..., ArrivingTerminalID: ..., TripDate: ... }",
    ],
  },
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
