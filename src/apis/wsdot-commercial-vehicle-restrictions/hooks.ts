/**
 * @fileoverview WSDOT Commercial Vehicle Restrictions API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Commercial Vehicle Restrictions API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Commercial Vehicle Restrictions hooks from the main hooks file
export {
  useGetCommercialVehicleRestrictions,
  useGetCommercialVehicleRestrictionsWithId,
} from "@/shared/tanstack/hooks";
