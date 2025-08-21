/**
 * WSDOT Highway Cameras API Functions
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

import type { z } from "zod";

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  type GetHighwayCameraParams,
  type GetHighwayCamerasParams,
  getHighwayCameraParamsSchema,
  getHighwayCamerasParamsSchema,
  searchHighwayCamerasParamsSchema,
} from "./inputs";
import type { Camera, GetCameraResponse } from "./outputs";
import { cameraArraySchema, cameraSchema } from "./outputs";

// Create a factory function for WSDOT Highway Cameras API
const createFetch = createZodFetchFactory(
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc"
);

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
  const fetcher = createFetch<GetHighwayCamerasParams>("/GetCamerasAsJson", {
    input: getHighwayCamerasParamsSchema,
    output: cameraArraySchema,
  });
  return fetcher(params) as Promise<Camera[]>;
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
  const fetcher = createFetch<GetHighwayCameraParams>(
    "/GetCameraAsJson?CameraID={cameraID}",
    {
      input: getHighwayCameraParamsSchema,
      output: cameraSchema,
    }
  );
  return fetcher(params) as Promise<GetCameraResponse>;
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

  const endpoint = `/SearchCamerasAsJson?${queryParams.toString()}`;

  const fetcher = createFetch<z.infer<typeof searchHighwayCamerasParamsSchema>>(
    endpoint,
    {
      input: searchHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    }
  );
  return fetcher(params) as Promise<Camera[]>;
};
