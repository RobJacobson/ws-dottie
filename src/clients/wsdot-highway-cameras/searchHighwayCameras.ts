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
import { zodFetchCustom } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";

// Import schemas and types from co-located file
import { cameraArraySchema, type CameraArray } from "@/schemas/wsdot-highway-cameras";

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson";

/** Searches highway cameras using optional filters */
export const searchHighwayCameras = async (
  params: SearchHighwayCamerasParams
): Promise<CameraArray> => {
  // Build query string by including only defined values
  const queryParams = new URLSearchParams();
  if (params.StateRoute !== undefined)
    queryParams.append("StateRoute", String(params.StateRoute));
  if (params.Region !== undefined)
    queryParams.append("Region", String(params.Region));
  if (params.StartingMilepost !== undefined)
    queryParams.append("StartingMilepost", String(params.StartingMilepost));
  if (params.EndingMilepost !== undefined)
    queryParams.append("EndingMilepost", String(params.EndingMilepost));

  const endpoint = `${ENDPOINT_BASE}?${queryParams.toString()}`;

  return zodFetchCustom(
    endpoint,
    {
      input: searchHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

// ============================================================================
// Input Schema & Types
// ============================================================================

/** Params schema for searchHighwayCameras */
export const searchHighwayCamerasParamsSchema = z
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

/** SearchHighwayCameras params type */
export type SearchHighwayCamerasParams = z.infer<
  typeof searchHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// Note: Schemas and types are now imported from ./cameraArray.zod
// ============================================================================

// ============================================================================
// TanStack Query Options
// ============================================================================

/** Returns options for searching cameras; polls daily */
export const searchHighwayCamerasOptions = createQueryOptions({
  apiFunction: searchHighwayCameras,
  queryKey: ["wsdot", "highway-cameras", "searchHighwayCameras"],
  cacheStrategy: "DAILY_STATIC",
});
