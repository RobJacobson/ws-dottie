/**
 * WSDOT Highway Cameras API Functions
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import type { z } from "zod";

import { zodFetch } from "@/shared/fetching";

import {
  type GetHighwayCameraParams,
  type GetHighwayCamerasParams,
  getHighwayCameraParamsSchema,
  getHighwayCamerasParamsSchema,
  searchHighwayCamerasParamsSchema,
} from "./inputs";
import { cameraArraySchema, cameraSchema } from "./outputs";

// Base URL path for WSDOT Highway Cameras API
const WSDOT_HIGHWAY_CAMERAS_BASE =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc";

/**
 * Get all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all camera data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const cameras = await getHighwayCameras({});
 * console.log(cameras[0].Title); // "I-5 @ NE 85th St"
 * ```
 */
export const getHighwayCameras = async (
  params: GetHighwayCamerasParams = {}
) => {
  return zodFetch(
    `${WSDOT_HIGHWAY_CAMERAS_BASE}/GetCamerasAsJson`,
    {
      input: getHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    params
  );
};

/**
 * Get a specific highway camera by ID
 *
 * Returns detailed information about a specific highway camera identified by its ID.
 *
 * @param params - Object containing cameraID parameter
 * @param params.cameraID - The unique identifier of the highway camera
 * @returns Promise containing the specific camera data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const camera = await getHighwayCamera({ cameraID: 1001 });
 * console.log(camera.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const getHighwayCamera = async (params: GetHighwayCameraParams) => {
  return zodFetch(
    `${WSDOT_HIGHWAY_CAMERAS_BASE}/GetCameraAsJson?CameraID={cameraID}`,
    {
      input: getHighwayCameraParamsSchema,
      output: cameraSchema,
    },
    params
  );
};

/**
 * Search for highway cameras with optional filters
 *
 * Returns filtered highway camera data based on search criteria such as region,
 * state route, or milepost range.
 *
 * @param params - Object containing search parameters
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @returns Promise containing filtered camera data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const cameras = await searchHighwayCameras({ StateRoute: "5" });
 * console.log(cameras[0].Title); // "I-5 @ NE 85th St"
 * ```
 */
export const searchHighwayCameras = async (
  params: z.infer<typeof searchHighwayCamerasParamsSchema>
): Promise<z.infer<typeof cameraArraySchema>> => {
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

  const endpoint = `${WSDOT_HIGHWAY_CAMERAS_BASE}/SearchCamerasAsJson?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: searchHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    params
  );
};
