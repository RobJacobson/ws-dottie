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
export { getActiveSeasons, useActiveSeasons } from "./getActiveSeasons";
export { getAlerts, useAlerts } from "./getAlerts";
export { getAllSailings, useAllSailings } from "./getAllSailings";
export {
  getAlternativeFormats,
  useAlternativeFormats,
} from "./getAlternativeFormats";
export {
  getCacheFlushDateSchedule,
  useCacheFlushDateSchedule,
} from "./getCacheFlushDateSchedule";
export { getRouteDetails, useRouteDetails } from "./getRouteDetails";
export {
  getRouteDetailsByRoute,
  useRouteDetailsByRoute,
} from "./getRouteDetailsByRoute";
export {
  getRouteDetailsByTerminals,
  useRouteDetailsByTerminals,
} from "./getRouteDetailsByTerminals";
export { getRoutes, useRoutes } from "./getRoutes";
export {
  getRoutesByTerminals,
  useRoutesByTerminals,
} from "./getRoutesByTerminals";
export {
  getRoutesWithDisruptions,
  useRoutesWithDisruptions,
} from "./getRoutesWithDisruptions";
export { getSailings, useSailings } from "./getSailings";
export { getScheduleByRoute, useScheduleByRoute } from "./getScheduleByRoute";
export {
  getScheduleByTerminals,
  useScheduleByTerminals,
} from "./getScheduleByTerminals";
export { getScheduledRoutes, useScheduledRoutes } from "./getScheduledRoutes";
export {
  getScheduledRoutesBySeason,
  useScheduledRoutesBySeason,
} from "./getScheduledRoutesBySeason";
export {
  getScheduleTodayByRoute,
  useScheduleTodayByRoute,
} from "./getScheduleTodayByRoute";
export {
  getScheduleTodayByTerminals,
  useScheduleTodayByTerminals,
} from "./getScheduleTodayByTerminals";
export { getTerminalMates, useTerminalMates } from "./getTerminalMates";
export { getTerminals, useTerminals } from "./getTerminals";
export {
  getTerminalsAndMates,
  useTerminalsAndMates,
} from "./getTerminalsAndMates";
export {
  getTerminalsAndMatesByRoute,
  useTerminalsAndMatesByRoute,
} from "./getTerminalsAndMatesByRoute";
export { getTimeAdjustments, useTimeAdjustments } from "./getTimeAdjustments";
export {
  getTimeAdjustmentsByRoute,
  useTimeAdjustmentsByRoute,
} from "./getTimeAdjustmentsByRoute";
export { getValidDateRange, useValidDateRange } from "./getValidDateRange";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Active Seasons
export {
  activeSeasonResponseSchema,
  activeSeasonsArraySchema,
} from "./getActiveSeasons";
// Alerts
export {
  alertSchema,
  alertsArraySchema,
} from "./getAlerts";
// Alternative Formats
export {
  alternativeFormatSchema,
  alternativeFormatsArraySchema,
  getAlternativeFormatsParamsSchema,
} from "./getAlternativeFormats";
// Cache Flush Date
export { scheduleCacheFlushDateSchema } from "./getCacheFlushDateSchedule";
// Route Details
export {
  getRouteDetailsParamsSchema,
  routeDetailsArraySchema,
  routeDetailsSchema,
} from "./getRouteDetails";
// Routes
export {
  getRoutesParamsSchema,
  routeSchema,
  routesArraySchema,
} from "./getRoutes";
// Routes with Disruptions
export {
  getRoutesWithDisruptionsParamsSchema,
  routesWithDisruptionsArraySchema,
  routeWithDisruptionsSchema,
} from "./getRoutesWithDisruptions";
// Sailings - Export from getSailings to avoid conflicts with getAllSailings
export {
  getSailingsParamsSchema,
  sailingResponseSchema,
  sailingSchema,
  sailingsArraySchema,
  sailingsResponseArraySchema,
} from "./getSailings";
// Schedule by Route
export {
  getScheduleByRouteParamsSchema,
  sailingTimeSchema,
  scheduleResponseArraySchema,
  scheduleResponseSchema,
  scheduleRouteTerminalComboSchema,
} from "./getScheduleByRoute";
// Scheduled Routes - Export from getScheduledRoutes to avoid conflicts with getRouteDetails
export {
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
} from "./getScheduledRoutes";
// Terminal Mates (from getTerminalMates)
export { getTerminalMatesParamsSchema } from "./getTerminalMates";
// Terminals (from getTerminals)
export {
  getTerminalsParamsSchema,
  scheduleTerminalSchema,
  scheduleTerminalsArraySchema,
} from "./getTerminals";
// Terminals and Mates (from getTerminalsAndMates)
export {
  getTerminalsAndMatesParamsSchema,
  scheduleTerminalComboSchema,
  scheduleTerminalCombosArraySchema,
} from "./getTerminalsAndMates";
// Terminals and Mates by Route (from getTerminalsAndMatesByRoute)
export { getTerminalsAndMatesByRouteParamsSchema } from "./getTerminalsAndMatesByRoute";
// Time Adjustments
export {
  timeAdjustmentResponseSchema,
  timeAdjustmentsArraySchema,
} from "./getTimeAdjustments";
// Valid Date Range
export { validDateRangeSchema } from "./getValidDateRange";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { ActiveSeasonResponse } from "./getActiveSeasons";
export type { Alert } from "./getAlerts";
export type {
  AlternativeFormat,
  GetAlternativeFormatsParams,
} from "./getAlternativeFormats";
export type {
  GetRouteDetailsParams,
  RouteDetails,
} from "./getRouteDetails";
export type {
  GetRoutesParams,
  Route,
} from "./getRoutes";
export type {
  GetRoutesWithDisruptionsParams,
  RouteWithDisruptions,
} from "./getRoutesWithDisruptions";
export type {
  GetSailingsParams,
  Sailing,
  SailingResponse,
} from "./getSailings";
export type {
  GetScheduleByRouteParams,
  SailingTime,
  ScheduleResponse,
  ScheduleRouteTerminalCombo,
} from "./getScheduleByRoute";
export type { ScheduledRoute } from "./getScheduledRoutes";
export type { GetTerminalMatesParams } from "./getTerminalMates";
export type {
  GetTerminalsParams,
  ScheduleTerminal,
} from "./getTerminals";
export type {
  GetTerminalsAndMatesParams,
  ScheduleTerminalCombo,
} from "./getTerminalsAndMates";
export type { GetTerminalsAndMatesByRouteParams } from "./getTerminalsAndMatesByRoute";
export type { TimeAdjustmentResponse } from "./getTimeAdjustments";
export type { ValidDateRange } from "./getValidDateRange";

// ============================================================================
// SHARED UTILITIES
// ============================================================================
