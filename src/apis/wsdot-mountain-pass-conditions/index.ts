/**
 * @fileoverview WSDOT Mountain Pass Conditions API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Mountain Pass Conditions API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotMountainPassConditionsApi } from "./endpoints";

// Export all input types
export type {
  GetMountainPassConditionInput,
  GetMountainPassConditionsInput,
} from "./original/inputSchemas.original";

// Export all output types
export type { PassCondition } from "./original/outputSchemas.original";
