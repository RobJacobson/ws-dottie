/**
 * @fileoverview WSDOT Traffic Flow API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Traffic Flow API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Traffic Flow hooks from the main hooks file
export {
  useGetTrafficFlowById,
  useGetTrafficFlows,
} from "@/shared/tanstack/hooks";
