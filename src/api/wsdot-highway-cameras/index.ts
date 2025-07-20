/**
 * WSDOT Highway Cameras API
 *
 * Exports all types, functions, and React hooks for the WSDOT Highway Cameras API.
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

// Export API functions
export {
  getHighwayCamera,
  getHighwayCameras,
  searchHighwayCameras,
} from "./api";
// Export React hooks
export {
  useHighwayCamera,
  useHighwayCameras,
  useSearchHighwayCameras,
} from "./hook";
// Export types
export type {
  Camera,
  CameraLocation,
  GetCameraResponse,
  GetCamerasResponse,
  SearchCamerasParams,
  SearchCamerasResponse,
} from "./types";
