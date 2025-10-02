/**
 * @fileoverview WSDOT Commercial Vehicle Restrictions API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Commercial Vehicle Restrictions API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotCommercialVehicleRestrictionsApi } from "./endpoints";

// Export all input types
export type {
  GetCommercialVehicleRestrictionsInput,
  GetCommercialVehicleRestrictionsWithIdInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  CVRestrictionDataList,
  CVRestrictionDataWithIdList,
} from "./original/outputSchemas.original";
