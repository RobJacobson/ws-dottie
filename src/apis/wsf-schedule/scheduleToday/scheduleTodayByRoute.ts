import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type ScheduleTodayByRouteInput,
  scheduleTodayByRouteSchema,
} from "./shared/scheduleToday.input";
import { type Schedule, scheduleSchema } from "./shared/scheduleToday.output";

/**
 * Metadata for the fetchScheduleTodayByRoute endpoint
 */
export const scheduleTodayByRouteMeta = {
  functionName: "fetchScheduleTodayByRoute",
  endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteSchema,
  outputSchema: scheduleSchema,
  sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
  endpointDescription: "Get today's schedule for a specific route.",
  toolDescription: {
    purpose:
      "Get today's complete sailing schedule for a specific route with real-time vessel assignments and departure times.",
    useWhen: [
      "planning today's travel on a specific route",
      "checking current vessel assignments",
      "getting real-time schedule information with filtering options",
    ],
    avoidWhen: [
      "you need schedule data for multiple routes (prefer bulk endpoints)",
      "you need historical schedule data (prefer sailing endpoints)",
    ],
    inputsHighlights:
      "RouteID (from fetchRoutesByTripDate → RouteID); OnlyRemainingTimes (true for future departures only, false for all today's departures)",
    returns: "object — today's complete schedule for the route",
    outputHighlights: [
      "Schedule info: ScheduleID, ScheduleName, ScheduleSeason, SchedulePDFUrl, ScheduleStart/End dates",
      "Route coverage: AllRoutes array of RouteIDs covered by this schedule",
      "Terminal combinations: TerminalCombos array with DepartingTerminalID/Name, ArrivingTerminalID/Name",
      "Departure times: Times array with DepartingTime, ArrivingTime, LoadingRule (1=Passenger, 2=Vehicle, 3=Both)",
      "Vessel assignments: VesselID, VesselName, VesselHandicapAccessible, VesselPositionNum",
      "Additional info: SailingNotes, Annotations, AnnotationIndexes for special conditions",
    ],
    chaining: [
      "fetchRoutesByTripDate → extract RouteID → call fetchScheduleTodayByRoute with { RouteID: ..., OnlyRemainingTimes: true }",
    ],
  },
} satisfies EndpointMeta<ScheduleTodayByRouteInput, Schedule>;

/**
 * Factory result for schedule today by route
 */
const scheduleTodayByRouteFactory = createFetchAndHook<
  ScheduleTodayByRouteInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleTodayByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/scheduleToday.endpoints").scheduleTodayGroup,
});

/**
 * Fetch function and React Query hook for retrieving today's schedule for a specific route
 */
export const {
  fetch: fetchScheduleTodayByRoute,
  hook: useScheduleTodayByRoute,
} = scheduleTodayByRouteFactory;
