/**
 * @fileoverview WSDOT Highway Cameras API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Highway Cameras API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotHighwayCamerasApi } from "./endpoints";

// Export all input types
export type {
  GetCameraInput,
  GetCamerasInput,
  SearchCamerasInput,
} from "./original/inputSchemas.original";

// Export all output types
export type { Camera } from "./original/outputSchemas.original";
