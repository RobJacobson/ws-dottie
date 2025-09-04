/**
 * @module WSDOT — Highway Cameras API
 * @description Highway camera metadata and images across WSDOT.
 *
 * Provides:
 * - Single camera by ID
 * - All cameras
 *
 * Data includes:
 * - Camera identifiers, location, owner, image URL/size, active status
 *
 * @functions
 *   - getHighwayCamera: Returns a single camera by ID
 *   - getHighwayCameras: Returns all cameras
 *
 * @input
 *   - getHighwayCamera:
 *     - cameraID: Camera identifier
 *   - getHighwayCameras: {}
 *
 * @output
 *   - getHighwayCamera: Camera
 *   - getHighwayCameras: Cameras
 *   - Camera fields:
 *     - CameraID: Camera identifier
 *     - CameraLocation: Camera location details
 *     - CameraOwner: Camera owner (nullable)
 *     - Description: Description (nullable)
 *     - DisplayLatitude: Display latitude
 *     - DisplayLongitude: Display longitude
 *     - ImageHeight: Image height (px)
 *     - ImageURL: Image URL
 *     - ImageWidth: Image width (px)
 *     - IsActive: Whether camera is active
 *     - OwnerURL: Owner URL (nullable)
 *     - Region: Region (nullable)
 *     - SortOrder: Sort order
 *     - Title: Title (nullable)
 *   - CameraLocation fields:
 *     - Description: Location description (nullable)
 *     - Direction: Direction (nullable)
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - MilePost: Highway milepost
 *     - RoadName: Highway/road name (nullable)
 *
 * @baseType
 *   - Camera: Camera record
 *   - CameraLocation: Camera location details
 *
 * @cli
 *   - getHighwayCamera: node dist/cli.mjs getHighwayCamera '{"cameraID": 9818}'
 *   - getHighwayCameras: node dist/cli.mjs getHighwayCameras
 *
 * @exampleResponse
 * {
 *   "CameraID": 9818,
 *   "CameraLocation": {
 *     "Description": null,
 *     "Direction": "W",
 *     "Latitude": 48.498333,
 *     "Longitude": -122.6625,
 *     "MilePost": 1,
 *     "RoadName": "Airports"
 *   },
 *   "CameraOwner": "WSDOT Aviation",
 *   "Description": null,
 *   "DisplayLatitude": 48.498333,
 *   "DisplayLongitude": -122.6625,
 *   "ImageHeight": 208,
 *   "ImageURL": "https://images.wsdot.wa.gov/airports/anafuel.jpg",
 *   "ImageWidth": 352,
 *   "IsActive": true,
 *   "OwnerURL": "https://wsdot.wa.gov/travel/aviation/airports-list/anacortes",
 *   "Region": "WA",
 *   "SortOrder": 5300,
 *   "Title": "Anacortes Airport Fuel Pump"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zNullableString } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// =========================================================================
// API Functions
// =========================================================================

const SINGLE_CAMERA_ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID={cameraID}";

/** Fetches a single highway camera by ID */
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

// =========================================================================
// getHighwayCameras (array second)
// =========================================================================

const ALL_CAMERAS_ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson";

/** Fetches all highway cameras */
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

// =========================================================================
// Input Schemas & Types (singular first, then array)
// =========================================================================

/** Params schema for getHighwayCamera */
export const getHighwayCameraParamsSchema = z.object({
  /** Camera identifier */
  cameraID: z.number().int(),
});

/** GetHighwayCamera params type */
export type GetHighwayCameraParams = z.infer<
  typeof getHighwayCameraParamsSchema
>;

/** Params schema for getHighwayCameras (none) */
export const getHighwayCamerasParamsSchema = z.object({});

/** GetHighwayCameras params type */
export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;

// =========================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// =========================================================================

/** Camera location schema */
export const cameraLocationSchema = z.object({
  /** Location description (nullable) */
  Description: zNullableString(),
  /** Direction (nullable) */
  Direction: zNullableString(),
  /** Latitude in decimal degrees */
  Latitude: z.number(),
  /** Longitude in decimal degrees */
  Longitude: z.number(),
  /** Highway milepost */
  MilePost: z.number(),
  /** Highway/road name (nullable) */
  RoadName: zNullableString(),
});

/** Camera item schema */
export const cameraSchema = z.object({
  /** Camera identifier */
  CameraID: z.number().int(),
  /** Camera location details */
  CameraLocation: cameraLocationSchema,
  /** Camera owner (nullable) */
  CameraOwner: zNullableString(),
  /** Description (nullable) */
  Description: zNullableString(),
  /** Display latitude */
  DisplayLatitude: z.number(),
  /** Display longitude */
  DisplayLongitude: z.number(),
  /** Image height (px) */
  ImageHeight: z.number().int(),
  /** Image URL */
  ImageURL: z.string(),
  /** Image width (px) */
  ImageWidth: z.number().int(),
  /** Whether camera is active */
  IsActive: z.boolean(),
  /** Owner URL (nullable) */
  OwnerURL: zNullableString(),
  /** Region (nullable) */
  Region: zNullableString(),
  /** Sort order */
  SortOrder: z.number().int(),
  /** Title (nullable) */
  Title: zNullableString(),
});

/** Cameras array schema */
export const cameraArraySchema = z.array(cameraSchema);

/** CameraLocation type */
export type CameraLocation = z.infer<typeof cameraLocationSchema>;

/** Camera type */
export type Camera = z.infer<typeof cameraSchema>;

/** Cameras type */
export type Cameras = z.infer<typeof cameraArraySchema>;

// =========================================================================
// TanStack Query Options (singular first, then array)
// =========================================================================

/** Returns options for a single camera by ID; polls daily */
export const highwayCameraOptions = (params: GetHighwayCameraParams) =>
  queryOptions({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCamera", params],
    queryFn: () => getHighwayCamera(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

/** Returns options for all cameras; polls daily */
export const highwayCamerasOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCameras"],
    queryFn: () => getHighwayCameras({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
