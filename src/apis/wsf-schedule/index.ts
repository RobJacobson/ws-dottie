/**
 * @fileoverview WSF Schedule API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Schedule API, exporting
 * all input/output types and the main API definition.
 */

// Export all input types
export type { ActiveScheduledSeasonsInput } from "./activeSeasons/activeSeasons.input";
export type { ScheduleBase } from "./activeSeasons/activeSeasons.output";
// Export the main API definition
// Export all resources for direct use
export {
  activeSeasonsResource,
  routeDetailsResource,
  routesResource,
  sailingsResource,
  scheduleAlertsResource,
  scheduleCacheFlushDateResource,
  scheduledRoutesResource,
  schedulesResource,
  scheduleTerminalMatesResource,
  scheduleTerminalsResource,
  scheduleTodayResource,
  scheduleValidDateRangeResource,
  serviceDisruptionsResource,
  timeAdjustmentsResource,
  wsfScheduleApi,
} from "./apiDefinition";
export type { SchedulesCacheFlushDate } from "./cacheFlushDate/cacheFlushDate.output";
export type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
  RoutesByTerminalsInput,
  RoutesHavingServiceDisruptionsInput,
  RoutesInput,
} from "./routes/routes.input";
export type {
  Route,
  RouteDetail,
  ServiceDisruption,
} from "./routes/routes.output";
export type {
  AllSchedSailingsBySchedRouteInput,
  SailingsByRouteIdInput,
} from "./sailings/sailings.input";
export type { Sailing } from "./sailings/sailings.output";
export type { AllAlertsInput } from "./scheduleAlerts/scheduleAlerts.input";
// Export all output types
export type { AlertDetail } from "./scheduleAlerts/scheduleAlerts.output";
export type {
  ScheduledRoutesByScheduleIdInput,
  ScheduledRoutesInput,
} from "./scheduledRoutes/scheduledRoutes.input";
export type { SchedRoute } from "./scheduledRoutes/scheduledRoutes.output";
export type {
  ScheduleByRouteInput,
  ScheduleByTerminalComboInput,
} from "./schedules/schedules.input";
export type { Schedule } from "./schedules/schedules.output";
export type {
  ScheduleTodayByRouteInput,
  TodaysScheduleByTerminalComboInput,
} from "./scheduleToday/scheduleToday.input";
export type {
  ScheduleTerminalMatesInput,
  ScheduleTerminalsInput,
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
} from "./terminals/terminals.input";
export type {
  Terminal,
  TerminalMate,
} from "./terminals/terminals.output";
export type {
  TimeAdjByRouteInput,
  TimeAdjBySchedRouteInput,
  TimeAdjInput,
} from "./timeAdjustments/timeAdjustments.input";
export type { TimeAdjustment } from "./timeAdjustments/timeAdjustments.output";
export type { ScheduleValidDateRangeInput } from "./validDateRange/validDateRange.input";
export type { ValidDateRange } from "./validDateRange/validDateRange.output";
