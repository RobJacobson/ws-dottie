/**
 * @module WSDOT — Highway Cameras: Search
 * @description Search highway cameras by route, region, and milepost range.
 *
 * Provides:
 * - Filtered camera results using optional parameters
 *
 * Data includes:
 * - Camera records (see Camera schema)
 *
 * @functions
 *   - searchHighwayCameras: Returns cameras filtered by provided parameters
 *
 * @input
 *   - searchHighwayCameras:
 *     - StateRoute: State route code (optional)
 *     - Region: Region name (optional)
 *     - StartingMilepost: Starting milepost (optional)
 *     - EndingMilepost: Ending milepost (optional)
 *
 * @output
 *   - searchHighwayCameras: Cameras (array of Camera)
 *
 * @cli
 *   - searchHighwayCameras: node dist/cli.mjs searchHighwayCameras '{"StateRoute":"005"}'
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

import {
  type Camera,
  camerasSchema,
} from "@/schemas/wsdot-highway-cameras/camera.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for searchHighwayCameras */
const searchHighwayCamerasInput = z
  .object({
    /** State route code (optional) */
    StateRoute: z.string().optional(),

    /** Region name (optional) */
    Region: z.string().optional(),

    /** Starting milepost (optional) */
    StartingMilepost: z.number().optional(),

    /** Ending milepost (optional) */
    EndingMilepost: z.number().optional(),
  })
  .strict();

/** Endpoint metadata for searchHighwayCameras */
export const searchHighwayCamerasMeta: EndpointDefinition<
  SearchHighwayCamerasInput,
  Camera[]
> = {
  id: "wsdot-highway-cameras:searchHighwayCameras",
  endpoint:
    "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson",
  inputSchema: searchHighwayCamerasInput,
  outputSchema: camerasSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type SearchHighwayCamerasInput = z.infer<
  typeof searchHighwayCamerasInput
>;
