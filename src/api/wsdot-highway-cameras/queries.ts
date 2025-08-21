/**
 * WSDOT Highway Cameras API React Query Hooks
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import {
  getHighwayCamera,
  getHighwayCameras,
  searchHighwayCameras,
} from "./api";
import type {
  GetHighwayCameraParams,
  GetHighwayCamerasParams,
  SearchHighwayCamerasParams,
} from "./inputs";
import type { Camera, GetCameraResponse } from "./outputs";

/**
 * React Query hook for getting all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing all camera data
 *
 * @example
 * ```typescript
 * const { data: cameras } = useHighwayCameras({});
 * console.log(cameras?.[0]?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useHighwayCameras = (
  params: GetHighwayCamerasParams = {},
  options?: TanStackOptions<Camera[]>
): UseQueryResult<Camera[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCameras", params],
    queryFn: () => getHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for getting a specific highway camera by ID
 *
 * Returns detailed information about a specific highway camera identified by its ID.
 *
 * @param params - Object containing cameraID parameter
 * @param params.cameraID - The unique identifier of the highway camera
 * @param options - Optional query options
 * @returns React Query result containing the camera data
 *
 * @example
 * ```typescript
 * const { data: camera } = useHighwayCamera({ cameraID: 1001 });
 * console.log(camera?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useHighwayCamera = (
  params: GetHighwayCameraParams,
  options?: TanStackOptions<GetCameraResponse>
): UseQueryResult<GetCameraResponse, Error> => {
  return useQuery<GetCameraResponse>({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCamera", params],
    queryFn: () => getHighwayCamera(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for searching highway cameras with filters
 *
 * Returns filtered highway camera data based on search criteria such as region,
 * state route, or milepost range.
 *
 * @param params - Search parameters (StateRoute, Region, StartingMilepost, EndingMilepost)
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @param options - Optional query options
 * @returns React Query result containing filtered camera data
 *
 * @example
 * ```typescript
 * const { data: cameras } = useSearchHighwayCameras({ StateRoute: "5" });
 * console.log(cameras?.[0]?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useSearchHighwayCameras = (
  params: SearchHighwayCamerasParams,
  options?: TanStackOptions<Camera[]>
): UseQueryResult<Camera[], Error> => {
  return useQuery<Camera[]>({
    queryKey: ["wsdot", "highway-cameras", "searchHighwayCameras", params],
    queryFn: () => searchHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
