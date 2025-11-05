/**
 * @fileoverview WSF Fares API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSF Fares API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSF Fares hooks from the main hooks file
export {
  useGetFareLineItemsBasic,
  useGetFareLineItemsByTripDateAndTerminals,
  useGetFareLineItemsVerbose,
  useGetFaresTerminals,
  useGetFaresValidDateRange,
  useGetFareTotalsByTripDateAndRoute,
  useGetTerminalCombo,
  useGetTerminalComboVerbose,
  useGetTerminalMates,
} from "@/shared/tanstack/hooks";
