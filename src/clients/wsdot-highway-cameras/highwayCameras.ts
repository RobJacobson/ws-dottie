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
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  cameraSchema,
  camerasSchema,
  type Camera,
  type Cameras,
} from "@/schemas/wsdot-highway-cameras";

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
// API Functions
// =========================================================================

/** Fetches a single highway camera by ID */
export const getHighwayCamera = zodFetch<GetHighwayCameraParams, Camera>(
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCameraAsJson?CameraID={cameraID}",
  getHighwayCameraParamsSchema,
  cameraSchema
);

// =========================================================================
// getHighwayCameras (array second)
// =========================================================================

/** Fetches all highway cameras */
export const getHighwayCameras = zodFetch<GetHighwayCamerasParams, Cameras>(
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
  getHighwayCamerasParamsSchema,
  camerasSchema
);

// =========================================================================
// TanStack Query Options (singular first, then array)
// =========================================================================

/** Returns options for a single camera by ID; polls daily */
export const highwayCameraOptions = createQueryOptions({
  apiFunction: getHighwayCamera,
  queryKey: ["wsdot", "highway-cameras", "getHighwayCamera"],
  cacheStrategy: "DAILY_STATIC",
});

/** Returns options for all cameras; polls daily */
export const highwayCamerasOptions = createQueryOptions({
  apiFunction: getHighwayCameras,
  queryKey: ["wsdot", "highway-cameras", "getHighwayCameras"],
  cacheStrategy: "DAILY_STATIC",
});
