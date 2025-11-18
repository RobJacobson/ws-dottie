/**
 * @fileoverview wsf-schedule API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

// Cache Flush Date
export type {
  CacheFlushDateInput as CacheFlushDateScheduleInput,
  CacheFlushDateOutput as CacheFlushDateSchedules,
} from "@/apis/shared/cacheFlushDate";
export {
  type TerminalMatesInput,
  type TerminalsInput,
  terminalMatesInputSchema,
  terminalsInputSchema,
} from "../shared/terminals.input";
export {
  type Terminal,
  type TerminalList,
  terminalListSchema,
  terminalSchema,
} from "../shared/terminals.output";
export {
  type ValidDateRange,
  validDateRangeSchema,
} from "../shared/validDateRange.output";
// Active Seasons
export { fetchActiveSeasons } from "./activeSeasons/activeSeasons";
export * from "./activeSeasons/shared/activeSeasons.input";
export * from "./activeSeasons/shared/activeSeasons.output";
export { fetchCacheFlushDateSchedule } from "./cacheFlushDate/cacheFlushDateSchedule";
// Route Details (re-exports types from routes, exports functions)
export { fetchRouteDetailsByTripDate } from "./routeDetails/routeDetailsByTripDate";
export { fetchRouteDetailsByTripDateAndRouteId } from "./routeDetails/routeDetailsByTripDateAndRouteId";
export { fetchRouteDetailsByTripDateAndTerminals } from "./routeDetails/routeDetailsByTripDateAndTerminals";
export { fetchRoutesByTripDate } from "./routes/routesByTripDate";
export { fetchRoutesByTripDateAndTerminals } from "./routes/routesByTripDateAndTerminals";
// Routes (Route Details re-exports these types, so export routes first)
export * from "./routes/shared/routes.input";
export * from "./routes/shared/routes.output";
// Sailings
export { fetchAllSailingsBySchedRouteID } from "./sailings/allSailingsBySchedRouteID";
export { fetchSailingsByRouteID } from "./sailings/sailingsByRouteID";
export * from "./sailings/shared/sailings.input";
export * from "./sailings/shared/sailings.output";
// Schedule Alerts
export { fetchScheduleAlerts } from "./scheduleAlerts/scheduleAlerts";
export * from "./scheduleAlerts/shared/scheduleAlerts.input";
export * from "./scheduleAlerts/shared/scheduleAlerts.output";
// Scheduled Routes
export { fetchScheduledRoutes } from "./scheduledRoutes/scheduledRoutes";
export { fetchScheduledRoutesById } from "./scheduledRoutes/scheduledRoutesById";
export * from "./scheduledRoutes/shared/scheduledRoutes.input";
export * from "./scheduledRoutes/shared/scheduledRoutes.output";
export { fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds } from "./schedules/scheduleByTripDateAndDepartingTerminalIdAndTerminalIds";
// Schedules
export { fetchScheduleByTripDateAndRouteId } from "./schedules/scheduleByTripDateAndRouteId";
export * from "./schedules/shared/schedules.input";
export * from "./schedules/shared/schedules.output";
// Schedule Today
export { fetchScheduleTodayByRoute } from "./scheduleToday/scheduleTodayByRoute";
export { fetchScheduleTodayByTerminals } from "./scheduleToday/scheduleTodayByTerminals";
export * from "./scheduleToday/shared/scheduleToday.input";
export * from "./scheduleToday/shared/scheduleToday.output";
// Service Disruptions
export { fetchRoutesHavingServiceDisruptionsByTripDate } from "./serviceDisruptions/routesHavingServiceDisruptionsByTripDate";
// Note: Service Disruptions input/output types are re-exported from routes, so they're already exported above
// Terminal Mates
export { fetchTerminalMatesSchedule } from "./terminalMates/terminalMatesSchedule";
export * from "./terminals/shared/terminals.input";
export * from "./terminals/shared/terminals.output";
// Terminals
export { fetchTerminals } from "./terminals/terminals";
export { fetchTerminalsAndMates } from "./terminals/terminalsAndMates";
export { fetchTerminalsAndMatesByRoute } from "./terminals/terminalsAndMatesByRoute";
export * from "./timeAdjustments/shared/timeAdjustments.input";
export * from "./timeAdjustments/shared/timeAdjustments.output";
// Time Adjustments
export { fetchTimeAdjustments } from "./timeAdjustments/timeAdjustments";
export { fetchTimeAdjustmentsByRoute } from "./timeAdjustments/timeAdjustmentsByRoute";
export { fetchTimeAdjustmentsBySchedRoute } from "./timeAdjustments/timeAdjustmentsBySchedRoute";
// Valid Date Range
export { fetchScheduleValidDateRange } from "./validDateRange/scheduleValidDateRange";
export * from "./validDateRange/shared/validDateRange.input";
