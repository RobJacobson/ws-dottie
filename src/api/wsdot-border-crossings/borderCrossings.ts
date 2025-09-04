/**
 * @module WSDOT — Border Crossings API
 * @description Border crossing wait times and related metadata for WSDOT border crossings.
 *
 * Provides:
 * - Current wait times for supported border crossings
 * - Crossing metadata including location, direction, and names
 *
 * Data includes:
 * - Crossing name, reported time (JS Date), estimated wait time (minutes)
 * - Optional location details (coordinates, road name, milepost)
 *
 * @functions
 *   - getBorderCrossings: Returns an array of border crossing data
 *
 * @input
 *   - getBorderCrossings: {}
 *
 * @output
 *   - getBorderCrossings: BorderCrossings
 *   - BorderCrossingData fields:
 *     - CrossingName: Crossing name
 *     - Time: Report time (JS Date)
 *     - WaitTime: Estimated wait time in minutes
 *     - BorderCrossingLocation: Optional location details or null
 *   - BorderCrossingLocation fields:
 *     - Description: Location description
 *     - Direction: Direction of travel (nullable)
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - MilePost: Highway milepost
 *     - RoadName: Highway/road name
 *
 * @baseType
 *   - BorderCrossingData: Border crossing report with optional location
 *   - BorderCrossingLocation: Location details for a border crossing
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
 *   "Time": "2025-09-03T21:00:00.000Z",
 *   "WaitTime": 20
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

/** Fetches all border crossing reports */
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

/** Params schema for getBorderCrossings (none) */
export const getBorderCrossingsParamsSchema = z.object({});

/** GetBorderCrossings params type (no parameters) */
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

/** Border crossing location schema */
export const borderCrossingLocationSchema = z
  .object({
    /** Location description */
    Description: z.string(),
    /** Direction of travel (nullable) */
    Direction: zNullableString(),
    /** Latitude in decimal degrees */
    Latitude: zLatitude(),
    /** Longitude in decimal degrees */
    Longitude: zLongitude(),
    /** Highway milepost */
    MilePost: z.number(),
    /** Highway/road name */
    RoadName: z.string(),
  })
  .nullable();

/** BorderCrossingLocation type */
export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;

/** Border crossing data item schema */
export const borderCrossingDataSchema = z.object({
  /** Optional location details or null */
  BorderCrossingLocation: borderCrossingLocationSchema.nullable(),
  /** Crossing name */
  CrossingName: z.string().nullable(),
  /** Report time (JS Date) */
  Time: zWsdotDate(),
  /** Estimated wait time in minutes */
  WaitTime: z.number(),
});

/** BorderCrossingData type */
export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

/** Border crossings array schema */
export const borderCrossingDataArraySchema = z.array(borderCrossingDataSchema);

/** BorderCrossings type */
export type BorderCrossings = z.infer<typeof borderCrossingDataArraySchema>;

// ==========================================================================
// TanStack Query Options
//
// borderCrossingsOptions
// ==========================================================================

/** Returns options for all border crossings; polls every 60s */
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
