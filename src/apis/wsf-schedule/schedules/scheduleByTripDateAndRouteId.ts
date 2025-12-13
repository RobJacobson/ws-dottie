import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type ScheduleByTripDateAndRouteIdInput,
  scheduleByTripDateAndRouteIdInputSchema,
} from "./shared/schedules.input";
import { type Schedule, scheduleSchema } from "./shared/schedules.output";

/**
 * Metadata for the fetchScheduleByTripDateAndRouteId endpoint
 */
export const scheduleByTripDateAndRouteIdMeta = {
  functionName: "fetchScheduleByTripDateAndRouteId",
  endpoint: "/schedule/{TripDate}/{RouteID}",
  inputSchema: scheduleByTripDateAndRouteIdInputSchema,
  outputSchema: scheduleSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription:
    "Get sailing schedule for a specific route and trip date.",
  toolDescription: {
    purpose:
      "Get complete sailing schedule for all terminal combinations on a specific route for a trip date, accounting for contingencies and time adjustments.",
    useWhen: [
      "getting the full schedule for an entire route",
      "planning complex multi-terminal travel on a route",
      "checking all departure options for a route",
    ],
    avoidWhen: [
      "you need schedule for specific terminals (prefer fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds)",
      "you need real-time schedule (prefer fetchScheduleTodayByRoute)",
    ],
    inputsHighlights:
      "TripDate (YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range); RouteID (from fetchRoutesByTripDate → RouteID)",
    returns:
      "object — complete schedule for route with all terminal combinations",
    outputHighlights: [
      "Schedule info: ScheduleID, ScheduleName, ScheduleSeason, SchedulePDFUrl, ScheduleStart/End dates",
      "Route coverage: AllRoutes array of RouteIDs",
      "Terminal combinations: TerminalCombos array with all departure/arrival pairs for the route",
      "Departure times: Times array per terminal combo with DepartingTime, ArrivingTime, LoadingRule (1=Passenger, 2=Vehicle, 3=Both)",
      "Vessel assignments: VesselID, VesselName, VesselHandicapAccessible, VesselPositionNum",
      "Additional info: SailingNotes, Annotations, AnnotationIndexes for special conditions",
    ],
    chaining: [
      "fetchRoutesByTripDate → extract RouteID → call fetchScheduleByTripDateAndRouteId with { RouteID: ..., TripDate: ... }",
    ],
  },
} satisfies EndpointMeta<ScheduleByTripDateAndRouteIdInput, Schedule>;

/**
 * Factory result for schedule by trip date and route ID
 */
const scheduleByTripDateAndRouteIdFactory = createFetchAndHook<
  ScheduleByTripDateAndRouteIdInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleByTripDateAndRouteIdMeta,
  getEndpointGroup: () =>
    require("./shared/schedules.endpoints").schedulesGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing schedule for a specific route and trip date
 */
export const {
  fetch: fetchScheduleByTripDateAndRouteId,
  hook: useScheduleByTripDateAndRouteId,
} = scheduleByTripDateAndRouteIdFactory;
