import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zNullableString } from "@/shared/fetching/validation/schemas";
import type { UseQueryOptions } from "@tanstack/react-query";

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
): Promise<Camera[]> => {
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

export const getHighwayCameraParamsSchema = z
  .object({
    cameraID: z.number().int().describe(""),
  })
  .describe("");

export type GetHighwayCameraParams = z.infer<
  typeof getHighwayCameraParamsSchema
>;

export const getHighwayCamerasParamsSchema = z.object({}).describe("");

export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

export const cameraLocationSchema = z
  .object({
    Description: zNullableString().describe(""),

    Direction: zNullableString().describe(""),

    Latitude: z.number().describe(""),

    Longitude: z.number().describe(""),

    MilePost: z.number().describe(""),

    RoadName: zNullableString().describe(""),
  })
  
  .describe("");

export const cameraSchema = z
  .object({
    CameraID: z.number().int().describe(""),

    CameraLocation: cameraLocationSchema.describe(""),

    CameraOwner: zNullableString().describe(""),

    Description: zNullableString().describe(""),

    DisplayLatitude: z.number().describe(""),

    DisplayLongitude: z.number().describe(""),

    ImageHeight: z.number().int().describe(""),

    ImageURL: z.string().describe(""),

    ImageWidth: z.number().int().describe(""),

    IsActive: z.boolean().describe(""),

    OwnerURL: zNullableString().describe(""),

    Region: zNullableString().describe(""),

    SortOrder: z.number().int().describe(""),

    Title: zNullableString().describe(""),
  })
  
  .describe("");

export const cameraArraySchema = z.array(cameraSchema).describe("");

export type CameraLocation = z.infer<typeof cameraLocationSchema>;

export type Camera = z.infer<typeof cameraSchema>;

// ============================================================================
// TanStack Query Hooks (singular first, then array)
// ============================================================================

export const useHighwayCamera = (
  params: GetHighwayCameraParams,
  options?: UseQueryOptions<Camera, Error>
) => {
  return useQuery<Camera>({
    queryKey: [
      "wsdot",
      "highway-cameras",
      "getHighwayCamera",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayCamera(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

export const useHighwayCameras = (
  params: GetHighwayCamerasParams = {},
  options?: UseQueryOptions<Camera[], Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-cameras",
      "getHighwayCameras",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
