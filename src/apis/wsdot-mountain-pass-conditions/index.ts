/**
 * @fileoverview WSDOT Mountain Pass Conditions API - Clean exports for types, API definition, and resources
 *
 * This module provides a clean interface for WSDOT Mountain Pass Conditions API, exporting
 * all input/output types, core functions, and React hooks.
 */

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
