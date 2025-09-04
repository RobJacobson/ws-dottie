/**
 * @module WSDOT — Toll Rates API
 * @description Current toll rates and related metadata for WSDOT tolled corridors.
 *
 * Provides:
 * - Current toll rates by trip
 *
 * Data includes:
 * - Trip name, route/direction, start/end milepost and location, current toll
 *
 * @functions
 *   - getTollRates: Returns current toll rates
 *
 * @input
 *   - getTollRates: {}
 *
 * @output
 *   - getTollRates: TollRates
 *   - TollRate fields:
 *     - CurrentToll: Current toll in cents
 *     - EndLocationName: End location name (nullable)
 *     - EndMilepost: End milepost
 *     - StartLocationName: Start location name (nullable)
 *     - StartMilepost: Start milepost
 *     - StateRoute: State route (nullable)
 *     - TravelDirection: Travel direction (nullable)
 *     - TripName: Trip identifier (nullable)
 *
 * @cli
 *   - getTollRates: node dist/cli.mjs getTollRates
 *
 * @exampleResponse
 * {
 *   "CurrentToll": 280,
 *   "EndLocationName": "NB S Portal",
 *   "EndMilepost": 30,
 *   "StartLocationName": "SB S Portal",
 *   "StartMilepost": 33,
 *   "StateRoute": "099",
 *   "TravelDirection": "S",
 *   "TripName": "099tp03268"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Function
//
// getTollRates
// ============================================================================

const ENDPOINT = "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson";

/** Fetches current toll rates */
export const getTollRates = async (
  params: GetTollRatesParams = {}
): Promise<TollRates> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollRatesParamsSchema,
      output: tollRateArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollRatesParamsSchema
// GetTollRatesParams
// ============================================================================

/** Params schema for getTollRates (none) */
export const getTollRatesParamsSchema = z.object({});

/** GetTollRates params type */
export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollRateSchema
// TollRate
// ============================================================================

/** Toll rate item schema */
export const tollRateSchema = z.object({
  /** Current toll in cents */
  CurrentToll: z.number(),
  /** End location name (nullable) */
  EndLocationName: z.string().nullable(),
  /** End milepost */
  EndMilepost: z.number(),
  /** Start location name (nullable) */
  StartLocationName: z.string().nullable(),
  /** Start milepost */
  StartMilepost: z.number(),
  /** State route (nullable) */
  StateRoute: z.string().nullable(),
  /** Travel direction (nullable) */
  TravelDirection: z.string().nullable(),
  /** Trip identifier (nullable) */
  TripName: z.string().nullable(),
});

/** Toll rates array schema */
export const tollRateArraySchema = z.array(tollRateSchema);

/** TollRate type */
export type TollRate = z.infer<typeof tollRateSchema>;

/** TollRates type */
export type TollRates = z.infer<typeof tollRateArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

/** Returns options for current toll rates; polls every 60s */
export const tollRatesOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollRates"],
    queryFn: () => getTollRates({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
