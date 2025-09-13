/**
 * @module WSDOT — Highway Cameras API
 * @description Highway camera metadata and images across WSDOT.
 *
 * Provides:
 * - All cameras
 *
 * Data includes:
 * - Camera identifiers, location, owner, image URL/size, active status
 *
 * @functions
 *   - getHighwayCameras: Returns all cameras
 *
 * @input
 *   - getHighwayCameras: {}
 *
 * @output
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
import { camerasSchema, type Camera } from "@/schemas/wsdot-highway-cameras/camera.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getHighwayCameras */
const highwayCamerasInput = z.object({});

/** Endpoint metadata for getHighwayCameras */
export const getHighwayCamerasMeta: Endpoint<HighwayCamerasInput, Camera[]> = {
  api: "wsdot-highway-cameras",
  function: "getHighwayCameras",
  endpoint:
    "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson",
  inputSchema: highwayCamerasInput,
  outputSchema: camerasSchema,
  sampleParams: {}, // Parameterless endpoint
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type HighwayCamerasInput = z.infer<typeof highwayCamerasInput>;
