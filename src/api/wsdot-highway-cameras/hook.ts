/**
 * WSDOT Highway Cameras API React Query Hooks
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "../../shared/caching/config";
import type { LoggingMode } from "../../shared/fetching/config";
import {
  getActiveHighwayCameras,
  getHighwayCamera,
  getHighwayCameras,
  getHighwayCamerasByRegion,
  getHighwayCamerasByRoute,
  searchHighwayCameras,
} from "./api";
import type {
  Camera,
  CameraResponse,
  CameraSearchParams,
  CameraSearchResponse,
  CamerasResponse,
} from "./types";

/**
 * React Query hook for getting all highway cameras
 *
 * @param logMode - Optional logging mode for debugging
 * @returns React Query result with all cameras
 *
 * @example
 * ```typescript
 * const { data: cameras, isLoading, error } = useHighwayCameras();
 * ```
 */
export const useHighwayCameras = (logMode?: LoggingMode) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "all"],
    queryFn: () => getHighwayCameras(logMode),
    ...createInfrequentUpdateOptions(),
    enabled: true,
  });
};

/**
 * React Query hook for getting a specific highway camera by ID
 *
 * @param cameraID - The unique camera identifier
 * @param logMode - Optional logging mode for debugging
 * @returns React Query result with the specific camera
 *
 * @example
 * ```typescript
 * const { data: camera, isLoading, error } = useHighwayCamera(9987);
 * ```
 */
export const useHighwayCamera = (cameraID: number, logMode?: LoggingMode) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "camera", cameraID],
    queryFn: () => getHighwayCamera(cameraID, logMode),
    ...createInfrequentUpdateOptions(),
    enabled: true,
  });
};

/**
 * React Query hook for searching highway cameras with optional filters
 *
 * @param params - Search parameters to filter cameras
 * @param logMode - Optional logging mode for debugging
 * @returns React Query result with matching cameras
 *
 * @example
 * ```typescript
 * // Search for cameras on SR 9 in NW region
 * const { data: cameras, isLoading, error } = useSearchHighwayCameras({
 *   StateRoute: '9',
 *   Region: 'NW'
 * });
 *
 * // Search for cameras in a milepost range
 * const { data: cameras, isLoading, error } = useSearchHighwayCameras({
 *   StartingMilepost: 10,
 *   EndingMilepost: 20
 * });
 * ```
 */
export const useSearchHighwayCameras = (
  params: CameraSearchParams = {},
  logMode?: LoggingMode
) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "search", params],
    queryFn: () => searchHighwayCameras(params, logMode),
    ...createInfrequentUpdateOptions(),
    enabled: true,
  });
};

/**
 * React Query hook for getting all active highway cameras
 *
 * @param logMode - Optional logging mode for debugging
 * @returns React Query result with active cameras only
 *
 * @example
 * ```typescript
 * const { data: activeCameras, isLoading, error } = useActiveHighwayCameras();
 * ```
 */
export const useActiveHighwayCameras = (logMode?: LoggingMode) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "active"],
    queryFn: () => getActiveHighwayCameras(logMode),
    ...createInfrequentUpdateOptions(),
    enabled: true,
  });
};

/**
 * React Query hook for getting cameras for a specific region
 *
 * @param region - Region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param logMode - Optional logging mode for debugging
 * @returns React Query result with cameras in the specified region
 *
 * @example
 * ```typescript
 * const { data: nwCameras, isLoading, error } = useHighwayCamerasByRegion('NW');
 * ```
 */
export const useHighwayCamerasByRegion = (
  region: string,
  logMode?: LoggingMode
) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "region", region],
    queryFn: () => getHighwayCamerasByRegion(region, logMode),
    ...createInfrequentUpdateOptions(),
    enabled: true,
  });
};

/**
 * React Query hook for getting cameras for a specific state route
 *
 * @param stateRoute - State route (e.g., "9", "I-5", "SR 520")
 * @param logMode - Optional logging mode for debugging
 * @returns React Query result with cameras on the specified route
 *
 * @example
 * ```typescript
 * const { data: i5Cameras, isLoading, error } = useHighwayCamerasByRoute('I-5');
 * ```
 */
export const useHighwayCamerasByRoute = (
  stateRoute: string,
  logMode?: LoggingMode
) => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "route", stateRoute],
    queryFn: () => getHighwayCamerasByRoute(stateRoute, logMode),
    ...createInfrequentUpdateOptions(),
    enabled: true,
  });
};
