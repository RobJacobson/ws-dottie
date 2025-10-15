/**
 * @fileoverview WSDOT Highway Cameras API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Highway Cameras API, exporting
 * all input/output types and the main API definition.
 */

// Export all input types
export type { GetCameraInput } from "./cameraDetails/cameraDetails.input";
// Export all output types
export type { Camera } from "./cameraDetails/cameraDetails.output";
export type {
  GetCamerasInput,
  SearchCamerasInput,
} from "./cameraList/cameraList.input";
// Export the main API definition
// Export individual resources for direct use
export {
  cameraDetailsResource,
  cameraListResource,
  wsdotHighwayCamerasApi,
} from "./endpoints";
