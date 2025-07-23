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
import type {
  Camera,
  GetCameraResponse,
  SearchCamerasParams,
  SearchCamerasResponse,
} from "./types";

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
    queryKey: ["highway-cameras"],
    queryFn: () => getHighwayCameras(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for getting a specific highway camera by ID
 *
 * @param cameraID - The unique camera identifier
 * @param options - Optional query options
 * @returns React Query result containing the camera data
 */
export const useHighwayCamera = (
  cameraID: number,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<GetCameraResponse>({
    queryKey: ["wsdot", "highwayCameras", "camera", cameraID],
    queryFn: () => getHighwayCamera(cameraID),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    enabled: (options?.enabled ?? true) && cameraID > 0,
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
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<SearchCamerasResponse>({
    queryKey: ["wsdot", "highwayCameras", "search", params],
    queryFn: () => searchHighwayCameras(params),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    enabled: options?.enabled ?? true,
  });
};
