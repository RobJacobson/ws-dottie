/**
 * @fileoverview WSDOT Mountain Pass Conditions API - Clean exports for types, API definition, and resources
 *
 * This module provides a clean interface for the WSDOT Mountain Pass Conditions API, exporting
 * all input/output types, the main API definition, and individual resource modules for flexible usage.
 */

// Export the main API definition (legacy format for backward compatibility)
export { wsdotMountainPassConditionsApi } from "./endpoints";
// Export individual resources for direct use
export { passConditionsResource } from "./passConditions/passConditions";
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
