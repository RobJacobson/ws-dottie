/**
 * @fileoverview WSDOT Highway Cameras API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Highway Cameras API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
// Export individual resources for direct use
export {
  camerasGroup,
  wsdotHighwayCamerasApi,
} from "./apiDefinition";
// Export all input types
export type {
  GetCameraInput,
  GetCamerasInput,
  SearchCamerasInput,
} from "./cameras/cameras.input";
// Export all output types
export type { Camera } from "./cameras/cameras.output";
