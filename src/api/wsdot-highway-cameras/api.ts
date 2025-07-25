/**
 * WSDOT Highway Cameras API Functions
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import { configManager } from "@/shared/config";
import { createApiClient, createFetchFactory } from "@/shared/fetching/api";
import type { LoggingMode } from "@/shared/logger";

import type { Camera, GetCameraResponse, SearchCamerasParams } from "./types";

// Create a factory function for WSDOT Highway Cameras API
const createWsdotHighwayCamerasFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc"
);

/**
 * Get all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all camera data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const cameras = await getHighwayCameras();
 * console.log(cameras[0].Title); // "I-5 @ NE 85th St"
 * ```
 */
export const getHighwayCameras =
  createWsdotHighwayCamerasFetch<Camera[]>("/GetCamerasAsJson");

/**
 * Get a specific highway camera by ID
 *
 * Returns detailed information about a specific highway camera identified by its ID.
 *
 * @param params - Object containing cameraID and optional logMode
 * @param params.cameraID - The unique identifier of the highway camera
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing the specific camera data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const camera = await getHighwayCamera({ cameraID: 1001 });
 * console.log(camera.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const getHighwayCamera = createWsdotHighwayCamerasFetch<
  { cameraID: number },
  GetCameraResponse
>("/GetCameraAsJson?CameraID={cameraID}");

/**
 * Search for highway cameras with optional filters
 *
 * Returns filtered highway camera data based on search criteria such as region,
 * state route, or milepost range.
 *
 * @param params - Object containing search parameters and optional logMode
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing filtered camera data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const cameras = await searchHighwayCameras({ StateRoute: "5" });
 * console.log(cameras[0].Title); // "I-5 @ NE 85th St"
 * ```
 */
export const searchHighwayCameras = async (
  params: SearchCamerasParams,
  logMode?: LoggingMode
): Promise<Camera[]> => {
  const fetchFn = createApiClient();

  // Build query parameters manually, only including defined values
  const queryParams = new URLSearchParams();

  if (params.StateRoute !== undefined) {
    queryParams.append("StateRoute", String(params.StateRoute));
  }
  if (params.Region !== undefined) {
    queryParams.append("Region", String(params.Region));
  }
  if (params.StartingMilepost !== undefined) {
    queryParams.append("StartingMilepost", String(params.StartingMilepost));
  }
  if (params.EndingMilepost !== undefined) {
    queryParams.append("EndingMilepost", String(params.EndingMilepost));
  }

  // Add API key
  queryParams.append("AccessCode", configManager.getApiKey());

  const endpoint = `/SearchCamerasAsJson?${queryParams.toString()}`;
  const url = `https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc${endpoint}`;

  return fetchFn<Camera[]>(url, logMode);
};
