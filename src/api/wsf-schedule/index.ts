// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export {
  getCacheFlushDateSchedule,
  useCacheFlushDateSchedule,
} from "../wsf/cacheFlushDate";
// Export specific functions to avoid schema conflicts
export { getActiveSeasons, useActiveSeasons } from "./activeSeasons";
export { getAlerts, useAlerts } from "./alerts";
export { getAllSailings, useAllSailings } from "./allSailings";
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

// Cache Flush Date
export { wsfCacheFlushDateSchema as scheduleCacheFlushDateSchema } from "../wsf/cacheFlushDate";
// Active Seasons
export {
  activeSeasonSchema,
  activeSeasonsArraySchema,
  getActiveSeasonsParamsSchema,
} from "./activeSeasons";
// Alerts
export {
  alertSchema,
  alertsArraySchema,
  getAlertsParamsSchema,
} from "./alerts";
// Route Details
export {
  getRouteDetailsByRouteParamsSchema,
  getRouteDetailsByTerminalsParamsSchema,
  getRouteDetailsParamsSchema,
  routeDetailsArraySchema,
  routeDetailsByRouteResponseSchema,
  routeDetailsSchema,
} from "./routeDetails";

// Routes
export {
  getRoutesByTerminalsParamsSchema,
  getRoutesParamsSchema,
  getRoutesWithDisruptionsParamsSchema,
  routeSchema,
  routesArraySchema,
  routesWithDisruptionsArraySchema,
  routeWithDisruptionsSchema,
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
  getScheduleTodayByRouteParamsSchema,
  getScheduleTodayByTerminalsParamsSchema,
  sailingTimeSchema,
  scheduleResponseArraySchema,
  scheduleResponseSchema,
  scheduleRouteTerminalComboSchema,
} from "./schedule";
// Scheduled Routes
export {
  getScheduledRoutesBySeasonParamsSchema,
  getScheduledRoutesParamsSchema,
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
} from "./scheduledRoutes";
// Terminals (consolidated - includes terminals, terminalMates, and terminalsAndMates)
export {
  getTerminalMatesParamsSchema,
  getTerminalsAndMatesByRouteParamsSchema,
  getTerminalsAndMatesParamsSchema,
  getTerminalsParamsSchema,
  scheduleTerminalComboSchema,
  scheduleTerminalCombosArraySchema,
  scheduleTerminalSchema,
  scheduleTerminalsArraySchema,
} from "./terminals";
// Time Adjustments
export {
  getTimeAdjustmentsByRouteParamsSchema,
  getTimeAdjustmentsParamsSchema,
  timeAdjustmentResponseSchema,
  timeAdjustmentSchema,
  timeAdjustmentsArraySchema,
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
  GetRouteDetailsByRouteParams,
  GetRouteDetailsByTerminalsParams,
  GetRouteDetailsParams,
  RouteDetails,
  RouteDetailsByRouteResponse,
} from "./routeDetails";

export type {
  GetRoutesByTerminalsParams,
  GetRoutesParams,
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
  GetScheduleTodayByRouteParams,
  GetScheduleTodayByTerminalsParams,
  SailingTime,
  ScheduleResponse,
  ScheduleRouteTerminalCombo,
} from "./schedule";
export type { ScheduledRoute } from "./scheduledRoutes";
export type {
  GetTerminalMatesParams,
  GetTerminalsAndMatesByRouteParams,
  GetTerminalsAndMatesParams,
  GetTerminalsParams,
  ScheduleTerminal,
  ScheduleTerminalCombo,
} from "./terminals";
export type { TimeAdjustment, TimeAdjustmentResponse } from "./timeAdjustments";
export type { ValidDateRange } from "./validDateRange";

// ============================================================================
// SHARED UTILITIES
// ============================================================================
