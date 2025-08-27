/**
 * WSF Schedule API - Complete Export Module
 *
 * This module provides access to Washington State Ferries schedule data including
 * routes, sailings, terminals, and time adjustments.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Export specific functions to avoid schema conflicts
export { getActiveSeasons, useActiveSeasons } from "./activeSeasons";
export { getAlerts, useAlerts } from "./alerts";
export { getAllSailings, useAllSailings } from "./allSailings";

export {
  getCacheFlushDateSchedule,
  useCacheFlushDateSchedule,
} from "../wsf/cacheFlushDate";
export * from "./routeDetails";
export * from "./routes";
export { getSailings, useSailings } from "./sailings";
export * from "./schedule";
export * from "./scheduledRoutes";
export * from "./terminals";
export * from "./timeAdjustments";
export { getValidDateRange, useValidDateRange } from "./validDateRange";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Active Seasons
export {
  activeSeasonSchema,
  activeSeasonsArraySchema,
} from "./activeSeasons";
// Alerts
export {
  alertSchema,
  alertsArraySchema,
} from "./alerts";

// Cache Flush Date
export { wsfCacheFlushDateSchema as scheduleCacheFlushDateSchema } from "../wsf/cacheFlushDate";
// Route Details
export {
  getRouteDetailsByTerminalsParamsSchema,
  getRouteDetailsByRouteParamsSchema,
  getRouteDetailsParamsSchema,
  routeDetailsArraySchema,
  routeDetailsSchema,
  routeDetailsByRouteResponseSchema,
} from "./routeDetails";

// Routes
export {
  getRoutesParamsSchema,
  getRoutesByTerminalsParamsSchema,
  getRoutesWithDisruptionsParamsSchema,
  routeSchema,
  routesArraySchema,
  routeWithDisruptionsSchema,
  routesWithDisruptionsArraySchema,
} from "./routes";

// Sailings - Export from getSailings to avoid conflicts with getAllSailings
export {
  getSailingsParamsSchema,
  sailingResponseSchema,
  sailingSchema,
  sailingsArraySchema,
  sailingsResponseArraySchema,
} from "./sailings";
// Schedule
export {
  getScheduleByRouteParamsSchema,
  getScheduleByTerminalsParamsSchema,
  getScheduleTodayByTerminalsParamsSchema,
  getScheduleTodayByRouteParamsSchema,
  sailingTimeSchema,
  scheduleResponseArraySchema,
  scheduleResponseSchema,
  scheduleRouteTerminalComboSchema,
} from "./schedule";
// Scheduled Routes
export {
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
} from "./scheduledRoutes";
// Terminals (consolidated - includes terminals, terminalMates, and terminalsAndMates)
export {
  getTerminalsParamsSchema,
  getTerminalMatesParamsSchema,
  getTerminalsAndMatesParamsSchema,
  getTerminalsAndMatesByRouteParamsSchema,
  scheduleTerminalSchema,
  scheduleTerminalsArraySchema,
  scheduleTerminalComboSchema,
  scheduleTerminalCombosArraySchema,
} from "./terminals";
// Time Adjustments
export {
  timeAdjustmentResponseSchema,
  timeAdjustmentsArraySchema,
  timeAdjustmentSchema,
  timeAdjustmentsByRouteArraySchema,
} from "./timeAdjustments";
// Valid Date Range
export { validDateRangeSchema } from "./validDateRange";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { ActiveSeason } from "./activeSeasons";
export type { Alert } from "./alerts";
export type {
  GetRouteDetailsByTerminalsParams,
  GetRouteDetailsByRouteParams,
  GetRouteDetailsParams,
  RouteDetails,
  RouteDetailsByRouteResponse,
} from "./routeDetails";

export type {
  GetRoutesParams,
  GetRoutesByTerminalsParams,
  GetRoutesWithDisruptionsParams,
  Route,
  RouteWithDisruptions,
} from "./routes";
export type {
  GetSailingsParams,
  Sailing,
  SailingResponse,
} from "./sailings";
export type {
  GetScheduleByRouteParams,
  GetScheduleByTerminalsParams,
  GetScheduleTodayByTerminalsParams,
  GetScheduleTodayByRouteParams,
  SailingTime,
  ScheduleResponse,
  ScheduleRouteTerminalCombo,
} from "./schedule";
export type { ScheduledRoute } from "./scheduledRoutes";
export type {
  GetTerminalsParams,
  GetTerminalMatesParams,
  GetTerminalsAndMatesParams,
  GetTerminalsAndMatesByRouteParams,
  ScheduleTerminal,
  ScheduleTerminalCombo,
} from "./terminals";
export type { TimeAdjustmentResponse, TimeAdjustment } from "./timeAdjustments";
export type { ValidDateRange } from "./validDateRange";

// ============================================================================
// SHARED UTILITIES
// ============================================================================
