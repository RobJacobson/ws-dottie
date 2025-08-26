/**
 * WSDOT Highway Cameras API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * highway camera data including real-time traffic camera feeds and locations.
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./highwayCameras";
export * from "./searchHighwayCameras";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core camera schemas (from co-located file)
export {
  cameraLocationSchema,
  cameraSchema,
  cameraArraySchema,
  getHighwayCameraParamsSchema,
  getHighwayCamerasParamsSchema,
} from "./highwayCameras";
// Search schemas
export { searchHighwayCamerasParamsSchema } from "./searchHighwayCameras";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  Camera,
  CameraLocation,
  GetHighwayCameraParams,
  GetHighwayCamerasParams,
} from "./highwayCameras";
export type { SearchHighwayCamerasParams } from "./searchHighwayCameras";
