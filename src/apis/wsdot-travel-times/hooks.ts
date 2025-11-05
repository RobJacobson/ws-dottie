/**
 * @fileoverview WSDOT Travel Times API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Travel Times API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Travel Times hooks from the main hooks file
export {
  useGetTravelTimeById,
  useGetTravelTimes,
} from "@/shared/tanstack/hooks";
