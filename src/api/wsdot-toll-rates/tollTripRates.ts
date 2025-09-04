/**
 * @module WSDOT — Toll Trip Rates API
 * @description Current toll trip rates including versioned trip list.
 *
 * Provides:
 * - Version number and list of current trip rates
 *
 * Data includes:
 * - Version, and array of TripName and Toll (cents) with message
 *
 * @functions
 *   - getTollTripRates: Returns current toll trip rates with version
 *
 * @input
 *   - getTollTripRates: {}
 *
 * @output
 *   - getTollTripRates: TollTripRates
 *   - TollTripRates fields:
 *     - Trips: Array of trip rate objects
 *     - Version: Version number
 *   - TollTripRate fields:
 *     - Message: Status/message
 *     - Toll: Toll in cents
 *     - TripName: Trip identifier
 *
 * @cli
 *   - getTollTripRates: node dist/cli.mjs getTollTripRates
 *
 * @exampleResponse
 * {
 *   "Message": "$1.00",
 *   "Toll": 1,
 *   "TripName": "405tp02752",
 *   "Version": 352417
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
// getTollTripRates
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson";

export const getTollTripRates = async (
  params: GetTollTripRatesParams = {}
): Promise<TollTripRates> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripRatesParamsSchema,
      output: tollTripRatesSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollTripRatesParamsSchema
// GetTollTripRatesParams
// ============================================================================

export const getTollTripRatesParamsSchema = z.object({});

export type GetTollTripRatesParams = z.infer<
  typeof getTollTripRatesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripRatesSchema
// TollTripRates
// ============================================================================

export const tollTripRateSchema = z.object({
  Message: z.string(),
  Toll: z.number(),
  TripName: z.string(),
});

export const tollTripRatesSchema = z.object({
  Trips: z.array(tollTripRateSchema),
  Version: z.number(),
});

export type TollTripRate = z.infer<typeof tollTripRateSchema>;

export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const tollTripRatesOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates"],
    queryFn: () => getTollTripRates({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
