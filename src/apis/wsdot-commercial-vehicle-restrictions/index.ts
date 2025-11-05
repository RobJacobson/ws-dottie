/**
 * @fileoverview WSDOT Commercial Vehicle Restrictions API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Commercial Vehicle Restrictions API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
export { wsdotCommercialVehicleRestrictionsApi } from "./apiDefinition";
// Export all core functions
export {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "./core";
// Export all input types
export type { GetCommercialVehicleRestrictionsInput } from "./cvRestrictionData/cvRestrictionData.input";
// Export all output types
export type { CVRestrictionData } from "./cvRestrictionData/cvRestrictionData.output";
export type { GetCommercialVehicleRestrictionsWithIdInput } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.input";
export type { CVRestrictionDataWithId } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.output";

// Export all React hooks
export {
  useGetCommercialVehicleRestrictions,
  useGetCommercialVehicleRestrictionsWithId,
} from "./hooks";
