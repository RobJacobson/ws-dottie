/**
 * @module WSDOT — Toll Trip Info API
 * @description Static information and geometry for toll trips.
 *
 * Provides:
 * - Trip geometries and metadata for tolled corridors
 *
 * Data includes:
 * - Trip name, route/direction, start/end milepost and location, geometry, modified date
 *
 * @functions
 *   - getTollTripInfo: Returns toll trip info records
 *
 * @input
 *   - getTollTripInfo: {}
 *
 * @output
 *   - getTollTripInfo: TollTripInfos
 *   - TollTripInfo fields:
 *     - EndLocationName: End location name (nullable)
 *     - EndMilepost: End milepost
 *     - Geometry: WGS84 LineString geometry (string)
 *     - ModifiedDate: Last modified date (JS Date, nullable)
 *     - StartLocationName: Start location name (nullable)
 *     - StartMilepost: Start milepost
 *     - TravelDirection: Travel direction (nullable)
 *     - TripName: Trip identifier (nullable)
 *
 * @cli
 *   - getTollTripInfo: node dist/cli.mjs getTollTripInfo
 *
 * @exampleResponse
 * {
 *   "EndLocationName": "NE 124th St",
 *   "EndMilepost": 20.76,
 *   "Geometry": "{ \"type\": \"LineString\", \"coordinates\": [[-122.18545726, 47.71554562], ... ] }",
 *   "ModifiedDate": "2022-11-01T20:44:51.757Z",
 *   "StartLocationName": "NE 4th",
 *   "StartMilepost": 13.51,
 *   "TravelDirection": "N",
 *   "TripName": "405tp01351"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Function
//
// getTollTripInfo
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson";

/** Fetches static information and geometry for toll trips */
export const getTollTripInfo = async (
  params: GetTollTripInfoParams = {}
): Promise<TollTripInfos> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripInfoParamsSchema,
      output: tollTripInfoArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollTripInfoParamsSchema
// GetTollTripInfoParams
// ============================================================================

/** Params schema for getTollTripInfo (none) */
export const getTollTripInfoParamsSchema = z.object({});

export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollTripInfoSchema
// TollTripInfo
// ============================================================================

/** Toll trip info item schema */
export const tollTripInfoSchema = z.object({
  /** End location name (nullable) */
  EndLocationName: z.string().nullable(),
  /** End milepost */
  EndMilepost: z.number(),
  /** WGS84 LineString geometry (string) */
  Geometry: z.string(),
  /** Last modified date (JS Date, nullable) */
  ModifiedDate: zWsdotDate().nullable(),
  /** Start location name (nullable) */
  StartLocationName: z.string().nullable(),
  /** Start milepost */
  StartMilepost: z.number(),
  /** Travel direction (nullable) */
  TravelDirection: z.string().nullable(),
  /** Trip identifier (nullable) */
  TripName: z.string().nullable(),
});

/** Toll trip info array schema */
export const tollTripInfoArraySchema = z.array(tollTripInfoSchema);

/** TollTripInfo type */
export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

/** TollTripInfos type */
export type TollTripInfos = z.infer<typeof tollTripInfoArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

/** Returns options for toll trip info; polls every 60s */
export const tollTripInfoOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo"],
    queryFn: () => getTollTripInfo({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
