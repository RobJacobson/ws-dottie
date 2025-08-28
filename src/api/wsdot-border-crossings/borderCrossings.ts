/**
 * Border Crossings API
 *
 * Real-time wait times and location information for Canadian border crossings in Washington State.
 *
 * This API provides current wait times and geographic location data for major border crossing points
 * along the Washington-Canada border, including I-5, SR 539, SR 543, and SR 9. Data includes
 * general purpose lanes, Nexus lanes, and truck-specific lanes. Wait times are updated in real-time
 * and are essential for travelers planning border crossings, logistics companies routing commercial
 * vehicles, and transportation planning applications. The API supports bulk retrieval of all border
 * crossing data without requiring specific parameters.
 *
 * API Functions:
 * - getBorderCrossings: Returns an array of BorderCrossingData objects for all border crossings
 *
 * Input/Output Overview:
 * - getBorderCrossings: Input: none, Output: BorderCrossingData[]
 *
 * Base Type: BorderCrossingData
 *
 * interface BorderCrossingData {
 *   BorderCrossingLocation: BorderCrossingLocation | null;
 *   CrossingName: string | null;
 *   Time: Date;
 *   WaitTime: number;
 * }
 *
 * interface BorderCrossingLocation {
 *   Description: string;
 *   Direction: string | null;
 *   Latitude: number;
 *   Longitude: number;
 *   MilePost: number;
 *   RoadName: string;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "BorderCrossingLocation": {
 *       "Description": "I-5 General Purpose",
 *       "Direction": null,
 *       "Latitude": 49.004776,
 *       "Longitude": -122.756964,
 *       "MilePost": 0,
 *       "RoadName": "005"
 *     },
 *     "CrossingName": "I5",
 *     "Time": "/Date(1756182000000-0700)/",
 *     "WaitTime": 5
 *   },
 *   {
 *     "BorderCrossingLocation": {
 *       "Description": "I-5 Nexus Lane",
 *       "Direction": null,
 *       "Latitude": 49.004776,
 *       "Longitude": -122.756964,
 *       "MilePost": 0,
 *       "RoadName": "005"
 *     },
 *     "CrossingName": "I5Nexus",
 *     "Time": "/Date(1756182000000-0700)/",
 *     "WaitTime": 5
 *   }
 * ]
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getBorderCrossings
// ============================================================================

const ENDPOINT =
  "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson";

/**
 * Retrieves real-time wait times and location data for all Canadian border crossings.
 *
 * @param params - No parameters required (empty object)
 * @returns Promise<BorderCrossingData[]> - Array of real-time border crossing data
 *
 * @example
 * const borderCrossings = await getBorderCrossings();
 * console.log(borderCrossings.length);  // 12
 * console.log(borderCrossings[0].CrossingName);  // "I5"
 * console.log(borderCrossings[0].WaitTime);  // 5
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getBorderCrossings = async (
  params: GetBorderCrossingsParams = {}
): Promise<BorderCrossingData[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getBorderCrossingsParamsSchema,
      output: borderCrossingDataArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getBorderCrossingsParamsSchema
// GetBorderCrossingsParams
// ============================================================================

/**
 * Parameters for retrieving border crossing data (no parameters required)
 */
export const getBorderCrossingsParamsSchema = z.object({});

export type GetBorderCrossingsParams = z.infer<
  typeof getBorderCrossingsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// borderCrossingDataSchema
// BorderCrossingData
// ============================================================================

/**
 * Geographic location and road information for a border crossing
 */
export const borderCrossingLocationSchema = z
  .object({
    Description: z.string(),

    Direction: zNullableString(),

    Latitude: zLatitude(),

    Longitude: zLongitude(),

    MilePost: z.number(),

    RoadName: z.string(),
  })

  .nullable();

/**
 * BorderCrossingLocation type - represents geographic location and road information for a border crossing
 */
export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;

export const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: borderCrossingLocationSchema.nullable(),

  CrossingName: z.string().nullable(),

  Time: zWsdotDate(),

  WaitTime: z.number(),
});

/**
 * BorderCrossingData type - represents real-time wait time and location data for a border crossing
 */
export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

/**
 * Array of border crossing data objects - wrapper around borderCrossingDataSchema
 */
export const borderCrossingDataArraySchema = z.array(borderCrossingDataSchema);

// ============================================================================
// TanStack Query Hook
//
// useBorderCrossings
// ============================================================================

/**
 * TanStack Query hook for border crossing data with automatic updates (array).
 *
 * @param params - No parameters required (empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<BorderCrossingData[], Error> - Query result with array of real-time border crossing data
 *
 * @example
 * const { data: borderCrossings, isLoading } = useBorderCrossings();
 * if (borderCrossings) {
 *   console.log(borderCrossings.length);  // 12
 *   console.log(borderCrossings[0].CrossingName);  // "I5"
 * }
 */
export const useBorderCrossings = (
  params: GetBorderCrossingsParams = {},
  options?: TanStackOptions<BorderCrossingData[]>
) => {
  return useQuery({
    queryKey: ["api", "wsdot", "border-crossings", JSON.stringify(params)],
    queryFn: () => getBorderCrossings(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
