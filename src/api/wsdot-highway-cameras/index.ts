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
  cameraArraySchema,
  cameraLocationSchema,
  cameraSchema,
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
  Cameras,
  CameraLocation,
  GetHighwayCameraParams,
  GetHighwayCamerasParams,
} from "./highwayCameras";
export type { SearchHighwayCamerasParams } from "./searchHighwayCameras";
