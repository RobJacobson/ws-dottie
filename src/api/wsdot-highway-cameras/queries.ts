/**
 * WSDOT Highway Cameras API React Query Hooks
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import {
  getHighwayCamera,
  getHighwayCameras,
  searchHighwayCameras,
} from "./api";
import type { Camera, GetCameraResponse, SearchCamerasParams } from "./types";

/**
 * React Query hook for getting all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 *
 * @param options - Optional query options
 * @returns React Query result containing all camera data
 *
 * @example
 * ```typescript
 * const { data: cameras } = useHighwayCameras();
 * console.log(cameras?.[0]?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useHighwayCameras = (
  options?: Parameters<typeof useQuery<Camera[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCameras"],
    queryFn: () => getHighwayCameras(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for getting a specific highway camera by ID
 *
 * Returns detailed information about a specific highway camera identified by its ID.
 *
 * @param params - Object containing cameraID
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
  params: { cameraID: number },
  options?: Parameters<typeof useQuery<GetCameraResponse>>[0]
) => {
  return useQuery<GetCameraResponse>({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCamera", params.cameraID],
    queryFn: () => getHighwayCamera({ cameraID: params.cameraID }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
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
  params: SearchCamerasParams,
  options?: Parameters<typeof useQuery<Camera[]>>[0]
) => {
  return useQuery<Camera[]>({
    queryKey: ["wsdot", "highway-cameras", "searchHighwayCameras", params],
    queryFn: () => searchHighwayCameras(params),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
