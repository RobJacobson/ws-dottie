/**
 * @fileoverview WSDOT Border Crossings API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Border Crossings API, exporting
 * all input/output types, the main API definition, and individual resources.
 */

// Export the main API definition
export { wsdotBorderCrossingsApi } from "./apiDefinition";
// Export individual resources for direct use
export { borderCrossingDataResource } from "./borderCrossingData/borderCrossingData";

// Export all input types
export type { GetBorderCrossingsInput } from "./original/inputSchemas.original";

// Export all output types
export type { BorderCrossingData } from "./original/outputSchemas.original";
