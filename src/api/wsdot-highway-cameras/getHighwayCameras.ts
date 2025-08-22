import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { Camera } from "./getHighwayCamera";
// Import schemas and types from single-item endpoint
import { cameraSchema } from "./getHighwayCamera";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

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
// INPUT SCHEMA & TYPES
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
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const cameraArraySchema = z
  .array(cameraSchema)
  .describe(
    "Array of highway camera data for all available cameras across Washington State highways. This collection provides comprehensive camera information that enables traffic monitoring, navigation applications, and transportation management."
  );

// ============================================================================
// QUERY HOOK
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
    queryKey: ["wsdot", "highway-cameras", "getHighwayCameras", params],
    queryFn: () => getHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
