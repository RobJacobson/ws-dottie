/**
 * @fileoverview WSDOT Toll Rates API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Toll Rates API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Toll Rates hooks from the main hooks file
export {
  useGetTollRates,
  useGetTollTripInfo,
  useGetTollTripRates,
  useGetTollTripVersion,
  useGetTripRatesByDate,
  useGetTripRatesByVersion,
} from "@/shared/tanstack/hooks";
