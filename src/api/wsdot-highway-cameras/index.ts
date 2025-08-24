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

export * from "./getHighwayCamera";
export * from "./getHighwayCameras";
export * from "./searchHighwayCameras";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core camera schemas (from single-item endpoint)
export {
  cameraLocationSchema,
  cameraSchema,
  getHighwayCameraParamsSchema,
} from "./getHighwayCamera";
// Array schemas
export {
  cameraArraySchema,
  getHighwayCamerasParamsSchema,
} from "./getHighwayCameras";
// Search schemas
export { searchHighwayCamerasParamsSchema } from "./searchHighwayCameras";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  Camera,
  CameraLocation,
  GetHighwayCameraParams,
} from "./getHighwayCamera";
export type { GetHighwayCamerasParams } from "./getHighwayCameras";
export type { SearchHighwayCamerasParams } from "./searchHighwayCameras";
