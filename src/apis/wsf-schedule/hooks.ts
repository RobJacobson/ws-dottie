/**
 * @fileoverview WSF Schedule API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSF Schedule API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSF Schedule hooks from the main hooks file
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
} from "@/shared/tanstack/hooks";
