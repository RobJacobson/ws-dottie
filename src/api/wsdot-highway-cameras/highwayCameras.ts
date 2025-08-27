/**
 * WSDOT Highway Cameras API
 *
 * Real-time traffic camera feeds from highway locations throughout Washington State, providing
 * live visual information for traffic monitoring, incident response, and traveler information.
 * Covers major highways including I-5, I-405, I-90, US 2, US 97, US 101, US 395, and various
 * state routes with cameras positioned at strategic locations for optimal traffic visibility.
 *
 * This API enables applications to display live traffic camera feeds, monitor road conditions,
 * and provide visual traffic information to travelers. Data includes camera locations with GPS
 * coordinates, milepost information, image specifications, and regional organization for major
 * metropolitan areas including Seattle, Spokane, Tacoma, and rural highway corridors.
 *
 * API Functions:
 * - getHighwayCamera: Returns one Camera object for the specified CameraID
 * - getHighwayCameras: Returns an array of Camera objects for all highway cameras
 *
 * Input/Output Overview:
 * - getHighwayCamera: Input: { cameraID: number }, Output: Camera
 * - getHighwayCameras: Input: none, Output: Camera[]
 *
 * Base Type: Camera
 *
 * interface Camera {
 *   CameraID: number;
 *   CameraLocation: CameraLocation;
 *   CameraOwner: string | null;
 *   Description: string | null;
 *   DisplayLatitude: number;
 *   DisplayLongitude: number;
 *   ImageHeight: number;
 *   ImageURL: string;
 *   ImageWidth: number;
 *   IsActive: boolean;
 *   OwnerURL: string | null;
 *   Region: string | null;
 *   SortOrder: number;
 *   Title: string | null;
 * }
 *
 * interface CameraLocation {
 *   Description: string | null;
 *   Direction: string | null;
 *   Latitude: number;
 *   Longitude: number;
 *   MilePost: number;
 *   RoadName: string | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID=10075&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the single camera curl command:
 *
 * ```json
 * {
 *   "CameraID": 10075,
 *   "CameraLocation": {
 *     "Description": null,
 *     "Direction": "S",
 *     "Latitude": 47.975188,
 *     "Longitude": -122.102579,
 *     "MilePost": 14,
 *     "RoadName": "SR 9"
 *   },
 *   "CameraOwner": null,
 *   "Description": null,
 *   "DisplayLatitude": 47.975188,
 *   "DisplayLongitude": -122.102579,
 *   "ImageHeight": 244,
 *   "ImageURL": "https://images.wsdot.wa.gov/nw/009vc01383.jpg",
 *   "ImageWidth": 335,
 *   "IsActive": true,
 *   "OwnerURL": null,
 *   "Region": "NW",
 *   "SortOrder": 3009,
 *   "Title": "SR 9 at MP 13.8: S Lake Stevens Rd"
 * }
 * ```
 */

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

/**
 * Retrieves real-time traffic camera data for a specific highway location by its ID.
 *
 * @param params - Parameters object for camera query
 * @param params.cameraID - Unique camera identifier (positive integer)
 * @returns Promise<Camera> - Real-time traffic camera data for the specified location
 *
 * @example
 * const camera = await getHighwayCamera({ cameraID: 10075 });
 * console.log(camera.Title);  // "SR 9 at MP 13.8: S Lake Stevens Rd"
 * console.log(camera.ImageURL);  // "https://images.wsdot.wa.gov/nw/009vc01383.jpg"
 * console.log(camera.IsActive);  // true
 *
 * @throws {Error} When camera ID is invalid or API is unavailable
 */
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

/**
 * Retrieves real-time traffic camera data for all available highway locations.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<Camera[]> - Array of real-time traffic camera data for all locations
 *
 * @example
 * const cameras = await getHighwayCameras();
 * console.log(cameras.length);  // 500+
 *
 * @throws {Error} When API is unavailable
 */
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

/**
 * Parameters for retrieving real-time traffic camera data for a specific location
 */
export const getHighwayCameraParamsSchema = z
  .object({
    cameraID: z.number().int().describe(""),
  })
  .describe("");

export type GetHighwayCameraParams = z.infer<
  typeof getHighwayCameraParamsSchema
>;

/**
 * Parameters for retrieving all traffic cameras (no parameters required)
 */
export const getHighwayCamerasParamsSchema = z.object({}).describe("");

export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

/**
 * CameraLocation type - represents the geographic location of a traffic camera
 */
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

/**
 * Real-time traffic camera data schema - includes camera location, image specifications, and metadata
 */
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

/**
 * Array of traffic camera objects - wrapper around cameraSchema
 */
export const cameraArraySchema = z.array(cameraSchema).describe("");

/**
 * CameraLocation type - represents the geographic location of a traffic camera
 */
export type CameraLocation = z.infer<typeof cameraLocationSchema>;

/**
 * Camera type - represents real-time traffic camera data for a highway location
 */
export type Camera = z.infer<typeof cameraSchema>;

// ============================================================================
// TanStack Query Hooks (singular first, then array)
// ============================================================================

/**
 * TanStack Query hook for highway camera data with automatic updates (single item).
 *
 * @param params - Parameters object for camera query
 * @param params.cameraID - Unique camera identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<Camera, Error> - Query result with real-time traffic camera data
 *
 * @example
 * const { data: camera, isLoading } = useHighwayCamera({ cameraID: 10075 });
 * if (camera) {
 *   console.log(camera.Title);  // "SR 9 at MP 13.8: S Lake Stevens Rd"
 *   console.log(camera.ImageURL);  // "https://images.wsdot.wa.gov/nw/009vc01383.jpg"
 * }
 */
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

/**
 * TanStack Query hook for all highway cameras with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<Camera[], Error> - Query result with array of real-time traffic camera data
 *
 * @example
 * const { data: cameras, isLoading } = useHighwayCameras();
 * if (cameras) {
 *   console.log(cameras.length);  // 500+
 * }
 */
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
