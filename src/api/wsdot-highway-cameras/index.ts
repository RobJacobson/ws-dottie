// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./highwayCameras";
export {
  searchHighwayCameras,
  searchHighwayCamerasOptions,
  searchHighwayCamerasParamsSchema,
} from "./searchHighwayCameras";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core camera schemas (from co-located file)
export {
  cameraArraySchema,
  cameraLocationSchema,
  cameraSchema,
  getHighwayCameraParamsSchema,
  getHighwayCamerasParamsSchema,
} from "./highwayCameras";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  Camera,
  CameraLocation,
  Cameras,
  GetHighwayCameraParams,
  GetHighwayCamerasParams,
} from "./highwayCameras";
export type { SearchHighwayCamerasParams } from "./searchHighwayCameras";
