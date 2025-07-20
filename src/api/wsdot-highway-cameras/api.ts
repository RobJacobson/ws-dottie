/**
 * WSDOT Highway Cameras API Functions
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import type { LoggingMode } from "../../shared/fetching/config";
import { fetchWsdot } from "../../shared/fetching/fetch";
import type {
  Camera,
  CameraResponse,
  CameraSearchParams,
  CameraSearchResponse,
  CamerasResponse,
} from "./types";

/**
 * Get all highway cameras
 *
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to all cameras
 * @throws {WsdotApiError} When API request fails
 *
 * @example
 * ```typescript
 * const cameras = await getHighwayCameras();
 * console.log(`Found ${cameras.length} cameras`);
 * ```
 */
export const getHighwayCameras = async (
  logMode?: LoggingMode
): Promise<CamerasResponse> => {
  return await fetchWsdot<CamerasResponse>(
    "highwayCameras",
    "/GetCamerasAsJson",
    logMode
  );
};

/**
 * Get a specific highway camera by ID
 *
 * @param cameraID - The unique camera identifier
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the specific camera
 * @throws {WsdotApiError} When API request fails or camera not found
 *
 * @example
 * ```typescript
 * const camera = await getHighwayCamera(9987);
 * console.log(`Camera: ${camera.Title}`);
 * ```
 */
export const getHighwayCamera = async (
  cameraID: number,
  logMode?: LoggingMode
): Promise<CameraResponse> => {
  return await fetchWsdot<CameraResponse>(
    "highwayCameras",
    `/GetCameraAsJson?CameraID=${cameraID}`,
    logMode
  );
};

/**
 * Search for highway cameras with optional filters
 *
 * @param params - Search parameters to filter cameras
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to matching cameras
 * @throws {WsdotApiError} When API request fails
 *
 * @example
 * ```typescript
 * // Search for cameras on SR 9 in NW region
 * const cameras = await searchHighwayCameras({
 *   StateRoute: '9',
 *   Region: 'NW'
 * });
 *
 * // Search for cameras in a milepost range
 * const cameras = await searchHighwayCameras({
 *   StartingMilepost: 10,
 *   EndingMilepost: 20
 * });
 * ```
 */
export const searchHighwayCameras = async (
  params: CameraSearchParams = {},
  logMode?: LoggingMode
): Promise<CameraSearchResponse> => {
  const searchParams = new URLSearchParams();

  if (params.StateRoute) {
    searchParams.append("StateRoute", params.StateRoute);
  }

  if (params.Region) {
    searchParams.append("Region", params.Region);
  }

  if (params.StartingMilepost !== undefined) {
    searchParams.append("StartingMilepost", params.StartingMilepost.toString());
  }

  if (params.EndingMilepost !== undefined) {
    searchParams.append("EndingMilepost", params.EndingMilepost.toString());
  }

  const queryString = searchParams.toString();
  const endpoint = `/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson${
    queryString ? `?${queryString}` : ""
  }`;

  return await fetchWsdot<CameraSearchResponse>(
    "highwayCameras",
    endpoint,
    logMode
  );
};

/**
 * Get all active highway cameras
 *
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to active cameras only
 * @throws {WsdotApiError} When API request fails
 *
 * @example
 * ```typescript
 * const activeCameras = await getActiveHighwayCameras();
 * console.log(`Found ${activeCameras.length} active cameras`);
 * ```
 */
export const getActiveHighwayCameras = async (
  logMode?: LoggingMode
): Promise<CamerasResponse> => {
  const allCameras = await getHighwayCameras(logMode);
  return allCameras.filter((camera) => camera.IsActive);
};

/**
 * Get cameras for a specific region
 *
 * @param region - Region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to cameras in the specified region
 * @throws {WsdotApiError} When API request fails
 *
 * @example
 * ```typescript
 * const nwCameras = await getHighwayCamerasByRegion('NW');
 * console.log(`Found ${nwCameras.length} cameras in NW region`);
 * ```
 */
export const getHighwayCamerasByRegion = async (
  region: string,
  logMode?: LoggingMode
): Promise<CamerasResponse> => {
  return await searchHighwayCameras({ Region: region }, logMode);
};

/**
 * Get cameras for a specific state route
 *
 * @param stateRoute - State route (e.g., "9", "I-5", "SR 520")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to cameras on the specified route
 * @throws {WsdotApiError} When API request fails
 *
 * @example
 * ```typescript
 * const i5Cameras = await getHighwayCamerasByRoute('I-5');
 * console.log(`Found ${i5Cameras.length} cameras on I-5`);
 * ```
 */
export const getHighwayCamerasByRoute = async (
  stateRoute: string,
  logMode?: LoggingMode
): Promise<CamerasResponse> => {
  return await searchHighwayCameras({ StateRoute: stateRoute }, logMode);
};
