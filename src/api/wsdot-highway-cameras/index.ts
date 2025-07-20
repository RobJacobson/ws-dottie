/**
 * WSDOT Highway Cameras API
 *
 * Complete API client for WSDOT Highway Cameras with TypeScript types,
 * API functions, and React Query hooks.
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

// Export all API functions
export {
  getActiveHighwayCameras,
  getHighwayCamera,
  getHighwayCameras,
  getHighwayCamerasByRegion,
  getHighwayCamerasByRoute,
  searchHighwayCameras,
} from "./api";
// Export all React Query hooks
export {
  useActiveHighwayCameras,
  useHighwayCamera,
  useHighwayCameras,
  useHighwayCamerasByRegion,
  useHighwayCamerasByRoute,
  useSearchHighwayCameras,
} from "./hook";
// Export all types
export type {
  Camera,
  CameraLocation,
  CameraResponse,
  CameraSearchParams,
  CameraSearchResponse,
  CamerasResponse,
} from "./types";
