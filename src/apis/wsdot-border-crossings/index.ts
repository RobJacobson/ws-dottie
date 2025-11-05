/**
 * @fileoverview WSDOT Border Crossings API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Border Crossings API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export all input types
export type { BorderCrossingDataInput } from "./borderCrossingData/borderCrossingData.input";

// Export all output types
export type { BorderCrossingData } from "./borderCrossingData/borderCrossingData.output";

// Export all core functions
export { getBorderCrossings } from "./core";

// Export all React hooks
export { useGetBorderCrossings } from "./hooks";
