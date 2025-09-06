// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export {
  getCacheFlushDateSchedule,
  useCacheFlushDateSchedule,
} from "../../shared/caching/cacheFlushDate";
// Export specific functions to avoid schema conflicts
export { getActiveSeasons, activeSeasonsOptions } from "./activeSeasons";
export { getAlerts, alertsOptions } from "./alerts";
export { getAllSailings, allSailingsOptions } from "./allSailings";
export * from "./routeDetails";
export * from "./routes";
export { getSailings, sailingsOptions } from "./sailings";
export {
  getScheduleByRoute,
  getScheduleByScheduleTerminals,
  getScheduleTodayByRoute,
  getScheduleTodayByScheduleTerminals,
  scheduleByRouteOptions,
  scheduleByScheduleTerminalsOptions,
  scheduleTodayByRouteOptions,
  scheduleTodayByScheduleTerminalsOptions,
} from "./schedule";
export {
  getScheduledRoutes,
  getScheduledRoutesBySeason,
  scheduledRoutesOptions,
  scheduledRoutesBySeasonOptions,
} from "./scheduledRoutes";
export {
  getScheduleTerminalMates,
  getScheduleTerminals,
  getScheduleTerminalsAndMates,
  getScheduleTerminalsAndMatesByRoute,
  terminalMatesOptions,
  terminalsOptions,
  terminalsAndMatesOptions,
  terminalsAndMatesByRouteOptions,
} from "./terminals";
export {
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  timeAdjustmentsOptions,
  timeAdjustmentsByRouteOptions,
} from "./timeAdjustments";
export { getValidDateRange, validDateRangeOptions } from "./validDateRange";

// ============================================================================
// SCHEMAS
// ============================================================================

export * from "@/schemas/wsf-schedule";
export { wsfCacheFlushDateSchema as scheduleCacheFlushDateSchema } from "../../shared/caching/cacheFlushDate";

// ============================================================================
// SHARED UTILITIES
// ============================================================================
