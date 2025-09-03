/**
 * @module WSDOT Border Crossings API
 * @description Real-time wait times and location information for Canadian border crossings in Washington State.
 *
 * Provides:
 * - Real-time wait time data for all border crossing points
 * - Geographic location information with GPS coordinates
 * - Road and milepost data for route planning
 * - Support for general purpose, Nexus, and truck-specific lanes
 * - Bulk retrieval of all border crossing data without parameters
 *
 * Data includes:
 * - Border crossing wait times in minutes
 * - Geographic coordinates (latitude/longitude)
 * - Road names and milepost information
 * - Crossing names and lane types
 * - Real-time timestamp data
 *
 * @functions
 *   - getBorderCrossings: Returns an array of BorderCrossingData objects for all border crossings
 *
 * @input
 *   - getBorderCrossings: {} - No parameters required
 *
 * @output
 *   - getBorderCrossings: BorderCrossingData[] - Array of border crossing data
 *
 * @baseType
 *   - BorderCrossingData: Real-time wait time and location data for a border crossing
 *   - BorderCrossingLocation: Geographic location and road information for a border crossing
 *
 * @cli
 *   - getBorderCrossings: node dist/cli.mjs getBorderCrossings
 *
 * @exampleResponse
 * {
 *   "BorderCrossingLocation": {
 *     "Description": "I-5 General Purpose",
 *     "Direction": null,
 *     "Latitude": 49.004776,
 *     "Longitude": -122.756964,
 *     "MilePost": 0,
 *     "RoadName": "005"
 *   },
 *   "CrossingName": "I5",
 *   "Time": "2025-08-29T01:20:00.000Z",
 *   "WaitTime": 5
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
 */

import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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
 * @param params - `{}` no parameters required
 * @returns `BorderCrossingData[]` - Array of real-time border crossing data
 *
 * @example
 * ```typescript
 * const borderCrossings = await getBorderCrossings()
 * console.log(borderCrossings.length)
 * console.log(borderCrossings[0].CrossingName)
 * ```
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getBorderCrossings = async (
  params: GetBorderCrossingsParams = {}
): Promise<BorderCrossings> => {
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
 * Input schema for the `getBorderCrossings` request (no parameters)
 */
export const getBorderCrossingsParamsSchema = z.object({});

/**
 * GetBorderCrossingsParams type - validated input parameters for `getBorderCrossings`
 */
export type GetBorderCrossingsParams = z.infer<
  typeof getBorderCrossingsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// borderCrossingLocationSchema
// borderCrossingDataSchema
// borderCrossingDataArraySchema
// BorderCrossingLocation
// BorderCrossingData
// BorderCrossings
// ============================================================================

/**
 * Response schema for the `BorderCrossingLocation` object
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
 * BorderCrossingLocation type - geographic location and road information
 */
export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;

/**
 * Response schema for a single `BorderCrossingData` object
 */
export const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: borderCrossingLocationSchema.nullable(),
  CrossingName: z.string().nullable(),
  Time: zWsdotDate(),
  WaitTime: z.number(),
});

/**
 * BorderCrossingData type - real-time wait time and location data
 */
export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

/**
 * Response schema for an array of `BorderCrossingData`
 */
export const borderCrossingDataArraySchema = z.array(borderCrossingDataSchema);

/**
 * BorderCrossings type - array of `BorderCrossingData`
 */
export type BorderCrossings = z.infer<typeof borderCrossingDataArraySchema>;

// ==========================================================================
// TanStack Query Options
//
// borderCrossingsOptions
// ==========================================================================

export const borderCrossingsOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "border-crossings", "getBorderCrossings"],
    queryFn: () => getBorderCrossings({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
