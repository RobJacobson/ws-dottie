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

const ENDPOINT_BASE =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

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
  params: SearchHighwayCamerasParams
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

  const endpoint = `${ENDPOINT_BASE}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: searchHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const searchHighwayCamerasParamsSchema = z
  .object({
    StateRoute: z
      .string()
      .optional()
      .describe(
        "Optional state route number to filter cameras by. Examples include '5' for I-5, '405' for I-405, '9' for SR 9, or '520' for SR 520. When provided, only cameras on the specified route are returned."
      ),

    Region: z
      .string()
      .optional()
      .describe(
        "Optional region code to filter cameras by geographic area. Valid codes include 'NW' (Northwest), 'NC' (North Central), 'SC' (South Central), 'SW' (Southwest), 'ER' (Eastern), 'OL' (Olympic), 'OS' (Olympic South), and 'WA' (Washington). When provided, only cameras in the specified region are returned."
      ),

    StartingMilepost: z
      .number()
      .optional()
      .describe(
        "Optional starting milepost for defining a search range along a highway. This parameter is typically used in combination with EndingMilepost to find cameras within a specific stretch of road. Mileposts are decimal numbers representing distance from the route's origin point."
      ),

    EndingMilepost: z
      .number()
      .optional()
      .describe(
        "Optional ending milepost for defining a search range along a highway. This parameter is typically used in combination with StartingMilepost to find cameras within a specific stretch of road. Mileposts are decimal numbers representing distance from the route's origin point."
      ),
  })
  .strict()
  .describe(
    "Parameters for searching and filtering highway cameras based on route, region, or milepost range. All parameters are optional and can be combined to create complex search queries."
  );

export type SearchHighwayCamerasParams = z.infer<
  typeof searchHighwayCamerasParamsSchema
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
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for searching highway cameras with filters
 *
 * Returns filtered highway camera data based on search criteria such as region,
 * state route, or milepost range.
 *
 * @param params - Search parameters (StateRoute, Region, StartingMilepost, EndingMilepost)
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @param options - Optional query options
 * @returns React Query result containing filtered camera data
 *
 * @example
 * ```typescript
 * const { data: cameras } = useSearchHighwayCameras({ StateRoute: "5" });
 * console.log(cameras?.[0]?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useSearchHighwayCameras = (
  params: SearchHighwayCamerasParams,
  options?: TanStackOptions<Camera[]>
): UseQueryResult<Camera[], Error> => {
  return useQuery<Camera[]>({
    queryKey: ["wsdot", "highway-cameras", "searchHighwayCameras", params],
    queryFn: () => searchHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
