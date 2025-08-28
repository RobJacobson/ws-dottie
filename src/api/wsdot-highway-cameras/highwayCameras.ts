import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zNullableString } from "@/shared/fetching/validation/schemas";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Functions
//
// getHighwayCamera (singular first)
// ============================================================================

const SINGLE_CAMERA_ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID={cameraID}";

export const getHighwayCamera = async (
  params: GetHighwayCameraParams
): Promise<Camera> => {
  return zodFetch(
    SINGLE_CAMERA_ENDPOINT,
    {
      input: getHighwayCameraParamsSchema,
      output: cameraSchema,
    },
    params
  );
};

// ============================================================================
// getHighwayCameras (array second)
// ============================================================================

const ALL_CAMERAS_ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson";

export const getHighwayCameras = async (
  params: GetHighwayCamerasParams = {}
): Promise<Cameras> => {
  return zodFetch(
    ALL_CAMERAS_ENDPOINT,
    {
      input: getHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types (singular first, then array)
// ============================================================================

export const getHighwayCameraParamsSchema = z.object({
  cameraID: z.number().int(),
});

export type GetHighwayCameraParams = z.infer<
  typeof getHighwayCameraParamsSchema
>;

export const getHighwayCamerasParamsSchema = z.object({});

export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

export const cameraLocationSchema = z.object({
  Description: zNullableString(),

  Direction: zNullableString(),

  Latitude: z.number(),

  Longitude: z.number(),

  MilePost: z.number(),

  RoadName: zNullableString(),
});

export const cameraSchema = z.object({
  CameraID: z.number().int(),

  CameraLocation: cameraLocationSchema,

  CameraOwner: zNullableString(),

  Description: zNullableString(),

  DisplayLatitude: z.number(),

  DisplayLongitude: z.number(),

  ImageHeight: z.number().int(),

  ImageURL: z.string(),

  ImageWidth: z.number().int(),

  IsActive: z.boolean(),

  OwnerURL: zNullableString(),

  Region: zNullableString(),

  SortOrder: z.number().int(),

  Title: zNullableString(),
});

export const cameraArraySchema = z.array(cameraSchema);

export type CameraLocation = z.infer<typeof cameraLocationSchema>;

export type Camera = z.infer<typeof cameraSchema>;

/**
 * Cameras type - represents an array of camera objects
 */
export type Cameras = z.infer<typeof cameraArraySchema>;

// ============================================================================
// TanStack Query Hooks (singular first, then array)
// ============================================================================

export const useHighwayCamera = createUseQueryWsdot({
  queryFn: getHighwayCamera,
  queryKeyPrefix: ["wsdot", "highway-cameras", "getHighwayCamera"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});

export const useHighwayCameras = createUseQueryWsdot({
  queryFn: getHighwayCameras,
  queryKeyPrefix: ["wsdot", "highway-cameras", "getHighwayCameras"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});
