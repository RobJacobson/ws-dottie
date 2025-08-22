/**
 * WSDOT Highway Cameras API
 *
 * Exports all types, functions, and React hooks for the WSDOT Highway Cameras API.
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Export from getHighwayCamera (includes shared schemas)
export {
  type Camera,
  type CameraLocation,
  cameraLocationSchema,
  cameraSchema,
  type GetHighwayCameraParams,
  getHighwayCamera,
  getHighwayCameraParamsSchema,
  useHighwayCamera,
} from "./getHighwayCamera";
// Export from getHighwayCameras (only unique exports)
export {
  cameraArraySchema,
  type GetHighwayCamerasParams,
  getHighwayCameras,
  getHighwayCamerasParamsSchema,
  useHighwayCameras,
} from "./getHighwayCameras";
// Export from searchHighwayCameras (only unique exports)
export {
  type SearchHighwayCamerasParams,
  searchHighwayCameras,
  searchHighwayCamerasParamsSchema,
  useSearchHighwayCameras,
} from "./searchHighwayCameras";
