/**
 * @fileoverview WSDOT Mountain Pass Conditions API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Mountain Pass Conditions API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Mountain Pass Conditions hooks from the main hooks file
export {
  useGetMountainPassConditionById,
  useGetMountainPassConditions,
} from "@/shared/tanstack/hooks";
