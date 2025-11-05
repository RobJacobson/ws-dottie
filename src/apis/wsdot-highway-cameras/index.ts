/**
 * @fileoverview WSDOT Highway Cameras API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Highway Cameras API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export all input types
export type {
  CameraInput,
  CamerasInput,
  CamerasSearchInput,
} from "./cameras/cameras.input";
// Export all output types
export type { Camera } from "./cameras/cameras.output";

// Export all core functions
export {
  getHighwayCameraByCameraId,
  getHighwayCameras,
  searchHighwayCamerasByRouteAndMilepost,
} from "./core";

// Export all React hooks
export {
  useGetHighwayCameraByCameraId,
  useGetHighwayCameras,
  useSearchHighwayCamerasByRouteAndMilepost,
} from "./hooks";
