/**
 * @fileoverview WSDOT Border Crossings API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Border Crossings API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
export { wsdotBorderCrossingsApi } from "./apiDefinition";
// Export individual resources for direct use
export { borderCrossingDataResource } from "./borderCrossingData/borderCrossingData.endpoints";

// Export all input types
export type { GetBorderCrossingsInput } from "./borderCrossingData/borderCrossingData.input";

// Export all output types
export type { BorderCrossingData } from "./borderCrossingData/borderCrossingData.output";

// Export all core functions
export { getBorderCrossings } from "./core";

// Export all React hooks
export { useGetBorderCrossings } from "./hooks";
