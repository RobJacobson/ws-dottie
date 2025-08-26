/**
 * Highway Cameras API - Search Endpoint
 *
 * Real-time traffic camera data from the Washington State Department of Transportation
 * highway camera system. This API provides filtered access to camera feeds based on
 * search criteria such as region, state route, or milepost range for targeted traffic
 * monitoring and navigation applications.
 *
 * This module handles searching and filtering camera data from the WSDOT Highway Cameras API,
 * allowing applications to retrieve specific subsets of cameras based on geographic
 * location, route information, or milepost ranges. The search functionality supports
 * filtering by region codes, state route numbers, and milepost ranges.
 *
 * API Functions:
 * - searchHighwayCameras: Returns filtered array of Camera objects based on search criteria
 * - useSearchHighwayCameras: TanStack Query hook for filtered camera data with automatic updates
 *
 * Input/Output Overview:
 * - searchHighwayCameras: Input: { StateRoute?: string, Region?: string, StartingMilepost?: number, EndingMilepost?: number }, Output: Camera[]
 * - useSearchHighwayCameras: Input: { StateRoute?: string, Region?: string, StartingMilepost?: number, EndingMilepost?: number }, Output: UseQueryResult<Camera[], Error>
 *
 * Base Type: Camera[]
 *
 * interface Camera {
 *   CameraID: number;
 *   CameraLocation: {
 *     Description: string | null;
 *     Direction: string | null;
 *     Latitude: number;
 *     Longitude: number;
 *     MilePost: number;
 *     RoadName: string | null;
 *   };
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
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson?Region=NW&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "CameraID": 1361,
 *     "CameraLocation": {
 *       "Description": null,
 *       "Direction": "B",
 *       "Latitude": 47.462588,
 *       "Longitude": -122.258334,
 *       "MilePost": 0,
 *       "RoadName": "I-405"
 *     },
 *     "CameraOwner": null,
 *     "Description": null,
 *     "DisplayLatitude": 47.462588,
 *     "DisplayLongitude": -122.258334,
 *     "ImageHeight": 249,
 *     "ImageURL": "https://images.wsdot.wa.gov/nw/405vc00034.jpg",
 *     "ImageWidth": 335,
 *     "IsActive": true,
 *     "OwnerURL": null,
 *     "Region": "NW",
 *     "SortOrder": 1200,
 *     "Title": "I-405 at MP 0.3: Southcenter"
 *   }
 * ]
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import type { Camera } from "./highwayCameras";
// Import schemas and types from co-located file
import { cameraSchema } from "./highwayCameras";

// ============================================================================
// API Function
//
// searchHighwayCameras
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson";

/**
 * Searches for highway cameras with optional filters based on region, state route, or milepost range.
 *
 * @param params - Object containing search parameters
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @returns Promise<Camera[]> - Filtered array of camera data based on search criteria
 *
 * @example
 * const cameras = await searchHighwayCameras({ Region: "NW" });
 * console.log(cameras.length);  // Number of cameras in Northwest region
 * console.log(cameras[0].Title);  // "I-405 at MP 0.3: Southcenter"
 *
 * @throws {Error} When API is unavailable or search parameters are invalid
 */
export const searchHighwayCameras = async (
  params: SearchHighwayCamerasParams
): Promise<Camera[]> => {
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

  return zodFetch(
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
//
// searchHighwayCamerasParamsSchema
// SearchHighwayCamerasParams
// ============================================================================

/**
 * Parameters for searching highway cameras with optional filters
 */
export const searchHighwayCamerasParamsSchema = z
  .object({
    StateRoute: z.string().optional().describe(""),

    Region: z.string().optional().describe(""),

    StartingMilepost: z.number().optional().describe(""),

    EndingMilepost: z.number().optional().describe(""),
  })
  .strict()
  .describe("");

export type SearchHighwayCamerasParams = z.infer<
  typeof searchHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// cameraArraySchema
// ============================================================================

/**
 * Array of filtered highway camera objects - wrapper around cameraSchema
 */
export const cameraArraySchema = z.array(cameraSchema).describe("");

// ============================================================================
// TanStack Query Hook
//
// useSearchHighwayCameras
// ============================================================================

/**
 * TanStack Query hook for searching highway cameras with filters and automatic updates.
 *
 * @param params - Search parameters object
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<Camera[], Error> - Query result with filtered camera data
 *
 * @example
 * const { data: cameras, isLoading } = useSearchHighwayCameras({ Region: "NW" });
 * if (cameras) {
 *   console.log(cameras.length);  // Number of cameras in Northwest region
 *   console.log(cameras[0].Title);  // "I-405 at MP 0.3: Southcenter"
 * }
 */
export const useSearchHighwayCameras = (
  params: SearchHighwayCamerasParams,
  options?: TanStackOptions<Camera[]>
): UseQueryResult<Camera[], Error> => {
  return useQuery<Camera[]>({
    queryKey: [
      "wsdot",
      "highway-cameras",
      "searchHighwayCameras",
      JSON.stringify(params),
    ],
    queryFn: () => searchHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
