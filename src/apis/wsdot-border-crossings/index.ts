/**
 * @fileoverview WSDOT Border Crossings API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Border Crossings API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotBorderCrossingsApi } from "./endpoints";

// Export all input types
export type { GetBorderCrossingsInput } from "./original/inputSchemas.original";

// Export all output types
export type { BorderCrossingDataList } from "./original/outputSchemas.original";
