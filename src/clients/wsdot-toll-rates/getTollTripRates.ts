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
import { zodFetchCustom } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { tollTripRatesSchema, type TollTripRates } from "@/schemas/wsdot-toll-rates";

// ============================================================================
// API Function
//
// getTollTripRates
// ============================================================================

export const getTollTripRates = async (
  params: GetTollTripRatesParams = {}
): Promise<TollTripRates> => {
  return zodFetchCustom(
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson",
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
// Note: Schemas and types are now imported from ./tollTripRates.zod
// ============================================================================

// ============================================================================
// TanStack Query Options
// ============================================================================

export const tollTripRatesOptions = createQueryOptions({
  apiFunction: getTollTripRates,
  queryKey: ["wsdot", "toll-rates", "getTollTripRates"],
  cacheStrategy: "MINUTE_UPDATES",
});
