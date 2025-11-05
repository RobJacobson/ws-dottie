/**
 * @fileoverview WSDOT Bridge Clearances API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Bridge Clearances API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Bridge Clearances hooks from the main hooks file
export {
  useGetBridgeClearances,
  useGetBridgeClearancesByRoute,
} from "@/shared/tanstack/hooks";
