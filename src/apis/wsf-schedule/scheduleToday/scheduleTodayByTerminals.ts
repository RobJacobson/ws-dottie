import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type ScheduleTodayByTerminalsInput,
  scheduleTodayByTerminalsInputSchema,
} from "./shared/scheduleToday.input";
import { type Schedule, scheduleSchema } from "./shared/scheduleToday.output";

/**
 * Metadata for the fetchScheduleTodayByTerminals endpoint
 */
export const scheduleTodayByTerminalsMeta = {
  functionName: "fetchScheduleTodayByTerminals",
  endpoint:
    "/scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByTerminalsInputSchema,
  outputSchema: scheduleSchema,
  sampleParams: {
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
    OnlyRemainingTimes: false,
  },
  endpointDescription: "Get today's schedule for a terminal pair.",
  toolDescription: {
    purpose:
      "Get today's sailing schedule for a specific terminal pair with real-time vessel assignments and departure times.",
    useWhen: [
      "planning today's travel between known terminals",
      "checking schedules for specific departure/arrival locations",
      "getting focused schedule data for a terminal pair",
    ],
    avoidWhen: [
      "you need schedules for multiple terminal pairs (prefer fetchScheduleTodayByRoute)",
      "you don't know terminal IDs (prefer fetchTerminalsAndMates first)",
    ],
    inputsHighlights:
      "DepartingTerminalID, ArrivingTerminalID (from fetchTerminalsAndMates → TerminalID); OnlyRemainingTimes (true for future departures only, false for all today's departures)",
    returns: "object — today's schedule for the terminal pair",
    outputHighlights: [
      "Schedule info: ScheduleID, ScheduleName, ScheduleSeason, SchedulePDFUrl, ScheduleStart/End dates",
      "Route coverage: AllRoutes array of RouteIDs for this terminal pair",
      "Terminal combination: Single TerminalCombos entry with DepartingTerminalID/Name, ArrivingTerminalID/Name",
      "Departure times: Times array with DepartingTime, ArrivingTime, LoadingRule (1=Passenger, 2=Vehicle, 3=Both)",
      "Vessel assignments: VesselID, VesselName, VesselHandicapAccessible, VesselPositionNum",
      "Additional info: SailingNotes, Annotations, AnnotationIndexes for special conditions",
    ],
    chaining: [
      "fetchTerminalsAndMates → extract DepartingTerminalID, ArrivingTerminalID → call fetchScheduleTodayByTerminals with { DepartingTerminalID: ..., ArrivingTerminalID: ..., OnlyRemainingTimes: true }",
    ],
  },
} satisfies EndpointMeta<ScheduleTodayByTerminalsInput, Schedule>;

/**
 * Factory result for schedule today by terminals
 */
const scheduleTodayByTerminalsFactory = createFetchAndHook<
  ScheduleTodayByTerminalsInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleTodayByTerminalsMeta,
  getEndpointGroup: () =>
    require("./shared/scheduleToday.endpoints").scheduleTodayGroup,
});

/**
 * Fetch function and React Query hook for retrieving today's schedule for a terminal pair
 */
export const {
  fetch: fetchScheduleTodayByTerminals,
  hook: useScheduleTodayByTerminals,
} = scheduleTodayByTerminalsFactory;
