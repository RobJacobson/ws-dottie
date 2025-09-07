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
import {
  type BorderCrossings,
  borderCrossingsSchema,
} from "@/schemas/wsdot-border-crossings";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

/** Params schema for getBorderCrossings (none) */
export const getBorderCrossingsParamsSchema = z.object({});

/** GetBorderCrossings params type (no parameters) */
export type GetBorderCrossingsParams = z.infer<
  typeof getBorderCrossingsParamsSchema
>;

/** Fetches all border crossing reports */
export const getBorderCrossings = async (
  params: GetBorderCrossingsParams
): Promise<BorderCrossings> =>
  zodFetch({
    endpoint:
      "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson",
    inputSchema: getBorderCrossingsParamsSchema,
    outputSchema: borderCrossingsSchema,
    params,
  });

/** Returns options for all border crossings; polls every 60s */
export const borderCrossingsOptions = createQueryOptions({
  apiFunction: getBorderCrossings,
  queryKey: ["wsdot", "border-crossings", "getBorderCrossings"],
  cacheStrategy: "MINUTE_UPDATES",
});
