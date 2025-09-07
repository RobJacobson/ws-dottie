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
import { type TollRates, tollRatesSchema } from "@/schemas/wsdot-toll-rates";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

/** Params schema for getTollRates (none) */
export const getTollRatesParamsSchema = z.object({});

/** GetTollRates params type */
export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

/** Fetches current toll rates */
export const getTollRates = async (
  params: GetTollRatesParams
): Promise<TollRates> =>
  zodFetch({
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson",
    inputSchema: getTollRatesParamsSchema,
    outputSchema: tollRatesSchema,
    params,
  });

/** Returns options for current toll rates; polls every 60s */
export const tollRatesOptions = createQueryOptions({
  apiFunction: getTollRates,
  queryKey: ["wsdot", "toll-rates", "getTollRates"],
  cacheStrategy: "MINUTE_UPDATES",
});
