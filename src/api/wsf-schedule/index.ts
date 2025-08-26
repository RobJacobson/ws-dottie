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
  getAlternativeFormats,
  useAlternativeFormats,
} from "./alternativeFormats";
export {
  getCacheFlushDateSchedule,
  useCacheFlushDateSchedule,
} from "./cacheFlushDateSchedule";
export * from "./routeDetails";
export * from "./routes";
export {
  getRoutesWithDisruptions,
  useRoutesWithDisruptions,
} from "./routesWithDisruptions";
export { getSailings, useSailings } from "./sailings";
export * from "./schedule";
export * from "./scheduledRoutes";
export * from "./scheduleToday";
export { getTerminalMates, useTerminalMates } from "./terminalMates";
export { getTerminals, useTerminals } from "./terminals";
export * from "./terminalsAndMates";
export * from "./timeAdjustments";
export { getValidDateRange, useValidDateRange } from "./validDateRange";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Active Seasons
export {
  activeSeasonResponseSchema,
  activeSeasonsArraySchema,
} from "./activeSeasons";
// Alerts
export {
  alertSchema,
  alertsArraySchema,
} from "./alerts";
// Alternative Formats
export {
  alternativeFormatSchema,
  alternativeFormatsArraySchema,
  getAlternativeFormatsParamsSchema,
} from "./alternativeFormats";
// Cache Flush Date
export { scheduleCacheFlushDateSchema } from "./cacheFlushDateSchedule";
// Route Details
export {
  getRouteDetailsByTerminalsParamsSchema,
  getRouteDetailsByRouteParamsSchema,
  routeDetailsArraySchema,
  routeDetailsSchema,
  routeDetailsByRouteResponseSchema,
} from "./routeDetails";
export { getRouteDetailsParamsSchema } from "./routeDetailsStandalone";
// Routes
export {
  getRoutesParamsSchema,
  getRoutesByTerminalsParamsSchema,
  routeSchema,
  routesArraySchema,
} from "./routes";
// Routes with Disruptions
export {
  getRoutesWithDisruptionsParamsSchema,
  routesWithDisruptionsArraySchema,
  routeWithDisruptionsSchema,
} from "./routesWithDisruptions";
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
// Terminal Mates (from getTerminalMates)
export { getTerminalMatesParamsSchema } from "./terminalMates";
// Terminals (from terminals)
export {
  getTerminalsParamsSchema,
  scheduleTerminalSchema,
  scheduleTerminalsArraySchema,
} from "./terminals";
// Terminals and Mates
export {
  getTerminalsAndMatesParamsSchema,
  scheduleTerminalComboSchema,
  scheduleTerminalCombosArraySchema,
  getTerminalsAndMatesByRouteParamsSchema,
} from "./terminalsAndMates";
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

export type { ActiveSeasonResponse } from "./activeSeasons";
export type { Alert } from "./alerts";
export type {
  AlternativeFormat,
  GetAlternativeFormatsParams,
} from "./alternativeFormats";
export type {
  GetRouteDetailsByTerminalsParams,
  GetRouteDetailsByRouteParams,
  RouteDetails,
  RouteDetailsByRouteResponse,
} from "./routeDetails";
export type { GetRouteDetailsParams } from "./routeDetailsStandalone";
export type {
  GetRoutesParams,
  GetRoutesByTerminalsParams,
  Route,
} from "./routes";
export type {
  GetRoutesWithDisruptionsParams,
  RouteWithDisruptions,
} from "./routesWithDisruptions";
export type {
  GetSailingsParams,
  Sailing,
  SailingResponse,
} from "./sailings";
export type {
  GetScheduleByRouteParams,
  GetScheduleByTerminalsParams,
  SailingTime,
  ScheduleResponse,
  ScheduleRouteTerminalCombo,
} from "./schedule";
export type { ScheduledRoute } from "./scheduledRoutes";
export type { GetTerminalMatesParams } from "./terminalMates";
export type {
  GetTerminalsParams,
  ScheduleTerminal,
} from "./terminals";
export type {
  GetTerminalsAndMatesParams,
  GetTerminalsAndMatesByRouteParams,
  ScheduleTerminalCombo,
} from "./terminalsAndMates";
export type { TimeAdjustmentResponse, TimeAdjustment } from "./timeAdjustments";
export type { ValidDateRange } from "./validDateRange";

// ============================================================================
// SHARED UTILITIES
// ============================================================================
