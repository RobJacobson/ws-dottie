/**
 * @fileoverview WSDOT Highway Alerts API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Highway Alerts API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Highway Alerts hooks from the main hooks file
export {
  useGetAlertById,
  useGetAlerts,
  useGetAlertsByMapArea,
  useGetAlertsByRegionId,
  useSearchAlerts,
} from "@/shared/tanstack/hooks";
