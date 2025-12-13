import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type ScheduleByTripDateAndTerminalsInput,
  scheduleByTripDateAndTerminals,
} from "./shared/schedules.input";
import { type Schedule, scheduleSchema } from "./shared/schedules.output";

/**
 * Metadata for the fetchScheduleByTripDateAndTerminalIds endpoint
 */
export const scheduleByTripDateAndTerminalIds = {
  functionName: "fetchScheduleByTripDateAndTerminalIds",
  endpoint: "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: scheduleByTripDateAndTerminals,
  outputSchema: scheduleSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription:
    "Get sailing schedule for a terminal pair and trip date.",
  toolDescription: {
    purpose:
      "Get complete sailing schedule for a specific terminal pair on a trip date, accounting for contingencies and time adjustments.",
    useWhen: [
      "planning travel between known terminals on a specific date",
      "getting scheduled departure times with all adjustments applied",
      "checking terminal-to-terminal sailing availability",
    ],
    avoidWhen: [
      "you need real-time schedule with current vessel assignments (prefer fetchScheduleTodayByTerminals)",
      "you don't know terminal IDs (prefer fetchTerminalsAndMates first)",
    ],
    inputs: [
      "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
      "DepartingTerminalID: from fetchTerminalsAndMates → TerminalID",
      "ArrivingTerminalID: from fetchTerminalsAndMates → TerminalID",
    ],
    returns:
      "object — complete schedule for terminal pair with all adjustments",
    outputHighlights: [
      "Schedule info: ScheduleID, ScheduleName, ScheduleSeason, SchedulePDFUrl, ScheduleStart/End dates",
      "Route coverage: AllRoutes array of RouteIDs",
      "Terminal combination: Single TerminalCombos entry with DepartingTerminalID/Name, ArrivingTerminalID/Name",
      "Departure times: Times array with DepartingTime, ArrivingTime, LoadingRule (1=Passenger, 2=Vehicle, 3=Both)",
      "Vessel assignments: VesselID, VesselName, VesselHandicapAccessible, VesselPositionNum",
      "Additional info: SailingNotes, Annotations, AnnotationIndexes for special conditions",
    ],
    chaining: [
      "fetchTerminalsAndMates → extract DepartingTerminalID, ArrivingTerminalID → call fetchScheduleByTripDateAndTerminalIds with { DepartingTerminalID: ..., ArrivingTerminalID: ..., TripDate: ... }",
    ],
  },
} satisfies EndpointMeta<ScheduleByTripDateAndTerminalsInput, Schedule>;

/**
 * Factory result for schedule by trip date and terminal IDs
 */
const scheduleByTripDateAndTerminalIdsFactory = createFetchAndHook<
  ScheduleByTripDateAndTerminalsInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleByTripDateAndTerminalIds,
  getEndpointGroup: () =>
    require("./shared/schedules.endpoints").schedulesGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing schedule for a terminal pair and trip date
 */
export const {
  fetch: fetchScheduleByTripDateAndTerminalIds,
  hook: useScheduleByTripDateAndTerminalIds,
} = scheduleByTripDateAndTerminalIdsFactory;
