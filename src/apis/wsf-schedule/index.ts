/**
 * @fileoverview WSF Schedule API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Schedule API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export all input types
export type { ActiveScheduledSeasonsInput } from "./activeSeasons/activeSeasons.input";
export type { ScheduleBase } from "./activeSeasons/activeSeasons.output";
export type { SchedulesCacheFlushDate } from "./cacheFlushDate/cacheFlushDate.output";
// Export all core functions
export {
  getActiveSeasons,
  getAllSailingsBySchedRouteID,
  getRouteDetailsByTripDate,
  getRouteDetailsByTripDateAndRouteId,
  getRouteDetailsByTripDateAndTerminals,
  getRoutesByTripDate,
  getRoutesByTripDateAndTerminals,
  getRoutesHavingServiceDisruptionsByTripDate,
  getSailingsByRouteID,
  getScheduleAlerts,
  getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  getScheduleByTripDateAndRouteId,
  getScheduledRoutes,
  getSchedulesCacheFlushDate,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
  getTerminalMates,
  getTerminals,
  getTimeAdjustments,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  getValidDateRange,
} from "./core";
// Export all React hooks
export {
  useGetActiveSeasons,
  useGetAllSailingsBySchedRouteID,
  useGetRouteDetailsByTripDate,
  useGetRouteDetailsByTripDateAndRouteId,
  useGetRouteDetailsByTripDateAndTerminals,
  useGetRoutesByTripDate,
  useGetRoutesByTripDateAndTerminals,
  useGetRoutesHavingServiceDisruptionsByTripDate,
  useGetSailingsByRouteID,
  useGetScheduleAlerts,
  useGetScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  useGetScheduleByTripDateAndRouteId,
  useGetScheduledRoutes,
  useGetScheduledRoutesById,
  useGetScheduleTodayByRoute,
  useGetScheduleTodayByTerminals,
  useGetScheduleValidDateRange,
  useGetTerminalMates,
  useGetTerminals,
  useGetTimeAdjustments,
  useGetTimeAdjustmentsByRoute,
  useGetTimeAdjustmentsBySchedRoute,
} from "./hooks";
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
