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
  GetCameraResponse,
  GetCamerasResponse,
  SearchCamerasParams,
  SearchCamerasResponse,
} from "./types";

/**
 * Get all highway cameras
 *
 * @param logMode - Optional logging mode for debugging
 * @returns Promise containing all camera data
 * @throws {WsdotApiError} When the API request fails
 */
export const getHighwayCameras = async (
  logMode?: LoggingMode
): Promise<GetCamerasResponse> => {
  return await fetchWsdot<GetCamerasResponse>(
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
 * @returns Promise containing the camera data
 * @throws {WsdotApiError} When the API request fails
 */
export const getHighwayCamera = async (
  cameraID: number,
  logMode?: LoggingMode
): Promise<GetCameraResponse> => {
  return await fetchWsdot<GetCameraResponse>(
    "highwayCameras",
    `/GetCameraAsJson?CameraID=${cameraID}`,
    logMode
  );
};

/**
 * Search for highway cameras with optional filters
 *
 * @param params - Search parameters (StateRoute, Region, StartingMilepost, EndingMilepost)
 * @param logMode - Optional logging mode for debugging
 * @returns Promise containing filtered camera data
 * @throws {WsdotApiError} When the API request fails
 */
export const searchHighwayCameras = async (
  params: SearchCamerasParams,
  logMode?: LoggingMode
): Promise<SearchCamerasResponse> => {
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
  const endpoint = `/SearchCamerasAsJson${queryString ? `?${queryString}` : ""}`;

  return await fetchWsdot<SearchCamerasResponse>(
    "highwayCameras",
    endpoint,
    logMode
  );
};
