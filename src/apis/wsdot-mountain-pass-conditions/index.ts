/**
 * @fileoverview WSDOT Mountain Pass Conditions API - Clean exports for types, API definition, and resources
 *
 * This module provides a clean interface for the WSDOT Mountain Pass Conditions API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export main API definition (legacy format for backward compatibility)
export { wsdotMountainPassConditionsApi } from "./apiDefinition";
// Export all core functions
export {
  getMountainPassConditionById,
  getMountainPassConditions,
} from "./core";
// Export all React hooks
export {
  useGetMountainPassConditionById,
  useGetMountainPassConditions,
} from "./hooks";
// Export individual resources for direct use
export { passConditionsGroup } from "./passConditions/passConditions.endpoints";
// Export all input types
export type {
  GetMountainPassConditionInput,
  GetMountainPassConditionsInput,
} from "./passConditions/passConditions.input";
// Export all output types
export type {
  PassCondition,
  TravelRestriction,
} from "./passConditions/passConditions.output";
