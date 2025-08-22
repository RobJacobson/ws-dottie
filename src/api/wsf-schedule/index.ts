// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getActiveSeasons";
export * from "./getAlerts";
export * from "./getAllSailings";
export * from "./getAlternativeFormats";
export * from "./getCacheFlushDateSchedule";
export * from "./getRouteDetails";
export * from "./getRouteDetailsByRoute";
export * from "./getRouteDetailsByTerminals";
export * from "./getRoutes";
export * from "./getRoutesByTerminals";
export * from "./getRoutesWithDisruptions";
export * from "./getSailings";
export * from "./getScheduleByRoute";
export * from "./getScheduleByTerminals";
export * from "./getScheduledRoutes";
export * from "./getScheduledRoutesBySeason";
export * from "./getScheduleTodayByRoute";
export * from "./getScheduleTodayByTerminals";
export * from "./getTerminalMates";
export * from "./getTerminals";
export * from "./getTerminalsAndMates";
export * from "./getTerminalsAndMatesByRoute";
export * from "./getTimeAdjustments";
export * from "./getTimeAdjustmentsByRoute";
export * from "./getTimeAdjustmentsBySchedRoute";
export * from "./getValidDateRange";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE (with explicit re-exports to resolve conflicts)
// ============================================================================

export type { ActiveSeasonResponse } from "./getActiveSeasons";
export type { Alert } from "./getAlerts";
export type { AlternativeFormat } from "./getAlternativeFormats";
export type {
  annotationSchema,
  contingencyAdjustmentSchema,
  RouteDetails,
  routeDetailsArraySchema,
  routeDetailsSchema,
  serviceDisruptionSchema,
} from "./getRouteDetails";
export type { RouteDetailsByRouteResponse } from "./getRouteDetailsByRoute";
export type {
  Route,
  routeSchema,
  routesArraySchema,
} from "./getRoutes";
export type {
  journeySchema,
  SailingResponse,
  sailingResponseSchema,
  sailingsArraySchema,
  terminalTimeSchema,
} from "./getSailings";
export type {
  SailingTime,
  ScheduleResponse,
  ScheduleRouteTerminalCombo,
  scheduleResponseArraySchema,
  scheduleResponseSchema,
} from "./getScheduleByRoute";
export type {
  ScheduledRoute,
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
} from "./getScheduledRoutes";
export type { scheduleTerminalsArraySchema } from "./getTerminals";
export type { scheduleTerminalCombosArraySchema } from "./getTerminalsAndMates";
export type {
  TimeAdjustmentResponse,
  timeAdjustmentResponseSchema,
  timeAdjustmentsArraySchema,
} from "./getTimeAdjustments";
export type {
  TimeAdjustment,
  timeAdjustmentSchema,
} from "./getTimeAdjustmentsByRoute";
export type { ValidDateRange } from "./getValidDateRange";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

export * from "./cache";
