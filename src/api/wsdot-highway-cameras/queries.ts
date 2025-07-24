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
 * @param options - Optional query options
 * @returns React Query result containing all camera data
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
 * @param params - Object containing cameraID
 * @param options - Optional query options
 * @returns React Query result containing the camera data
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
 * @param params - Search parameters (StateRoute, Region, StartingMilepost, EndingMilepost)
 * @param options - Optional query options
 * @returns React Query result containing filtered camera data
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
