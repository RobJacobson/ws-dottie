import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import type { Camera } from "./getHighwayCamera";
// Import schemas and types from single-item endpoint
import { cameraSchema } from "./getHighwayCamera";

// ============================================================================
// API Function
//
// getHighwayCameras
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson";

/**
 * Get all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 * Provides comprehensive camera coverage across Washington State with real-time images,
 * locations, and metadata for traffic monitoring and navigation applications.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all camera data including 1,000+ cameras across all major routes
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const cameras = await getHighwayCameras({});
 * console.log(cameras[0].Title); // "SR 9 at MP 13.3: 32nd St SE"
 * console.log(cameras[0].ImageURL); // "https://images.wsdot.wa.gov/nw/009vc01331.jpg"
 * ```
 */
export const getHighwayCameras = async (
  params: GetHighwayCamerasParams = {}
): Promise<Camera[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getHighwayCamerasParamsSchema
// GetHighwayCamerasParams
// ============================================================================

// No input parameters currently needed for getHighwayCameras
// This schema represents an empty parameter object for consistency
export const getHighwayCamerasParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all highway cameras. The API returns all available highway cameras across Washington State."
  );

export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// cameraArraySchema
// ============================================================================

export const cameraArraySchema = z
  .array(cameraSchema)
  .describe(
    "Array of highway camera data for all available cameras across Washington State highways. This collection includes over 1,000 cameras covering all major routes from I-5 and US 101 in the west to US 2 and US 97 in the east. Cameras are organized by region (NW=Northwest, OL=Olympic, SW=Southwest, ER=Eastern, SC=South Central, NC=North Central) and provide real-time traffic monitoring for navigation applications and transportation management."
  );

// ============================================================================
// TanStack Query Hook
//
// useHighwayCameras
// ============================================================================

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
    queryKey: [
      "wsdot",
      "highway-cameras",
      "getHighwayCameras",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
