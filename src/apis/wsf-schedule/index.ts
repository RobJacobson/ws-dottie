/**
 * @fileoverview WSF Schedule API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Schedule API, exporting
 * all input/output types and the main API definition.
 */

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
} from "./endpoints";

// Export all input types
export type {
  ActiveScheduledSeasonsInput,
  AllAlertsInput,
  AllSchedSailingsBySchedRouteInput,
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
  RoutesByTerminalsInput,
  RoutesHavingServiceDisruptionsInput,
  RoutesInput,
  SailingsByRouteIdInput,
  ScheduleByRouteInput,
  ScheduleByTerminalComboInput,
  ScheduledRoutesByScheduleIdInput,
  ScheduledRoutesInput,
  ScheduleTerminalMatesInput,
  ScheduleTerminalsInput,
  ScheduleTodayByRouteInput,
  ScheduleValidDateRangeInput,
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesInput,
  TimeAdjByRouteInput,
  TimeAdjBySchedRouteInput,
  TimeAdjInput,
  TodaysScheduleByTerminalComboInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  AlertDetail,
  Route,
  RouteDetail,
  Sailing,
  SchedRoute,
  Schedule,
  ScheduleBase,
  SchedulesCacheFlushDate,
  ServiceDisruption,
  Terminal,
  TerminalMate,
  TimeAdjustment,
  ValidDateRange,
} from "./original/outputSchemas.original";
