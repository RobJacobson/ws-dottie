/**
 * @module WSDOT — Trip Rates By Date API
 * @description Historical toll trip rates for a date range.
 *
 * Provides:
 * - Trip rates for a specified date interval
 *
 * Data includes:
 * - Version and last-updated timestamps
 * - Trips array with message, message update time, toll (dollars), and trip name
 *
 * @functions
 *   - getTripRatesByDate: Returns rates between fromDate and toDate
 *
 * @input
 *   - getTripRatesByDate:
 *     - fromDate: Start date (JS Date)
 *     - toDate: End date (JS Date)
 *
 * @output
 *   - getTripRatesByDate: TripRatesByDate
 *
 * @cli
 *   - Dates as strings are accepted; the CLI converts YYYY-MM-DD to JS Date.
 *   - Examples:
 *     - node dist/cli.mjs getTripRatesByDate '{"fromDate":"2025-08-01","toDate":"2025-08-02"}'
 *     - node dist/cli.mjs getTripRatesByDate '{"fromDate":"2025-09-03","toDate":"2025-09-03"}'
 *
 * @exampleResponse
 * {
 *   "LastUpdated": "2025-08-31T23:56:34.000Z",
 *   "Trips": [
 *     {
 *       "Message": "FREE",
 *       "MessageUpdateTime": "2025-08-31T23:56:08.000Z",
 *       "Toll": 0,
 *       "TripName": "405tp02612"
 *     }
 *   ],
 *   "Version": 342345
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
 */
import { z } from "zod";
import {
  type TripRatesByDate,
  tripRatesByDateItemSchema,
} from "@/schemas/wsdot-toll-rates";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetchCustom } from "@/shared/fetching";

/** Fetches trip rates between two dates (YYYY-MM-DD) */
export const getTripRatesByDate = async (
  params: GetTripRatesByDateParams
): Promise<TripRatesByDate> => {
  const queryParams = new URLSearchParams();
  queryParams.append("fromDate", params.fromDate.toISOString().split("T")[0]);
  queryParams.append("toDate", params.toDate.toISOString().split("T")[0]);

  const endpoint = `/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?${queryParams.toString()}`;

  return zodFetchCustom(
    endpoint,
    {
      input: getTripRatesByDateParamsSchema,
      output: tripRatesByDateItemSchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

/** Params schema for getTripRatesByDate */
export const getTripRatesByDateParamsSchema = z.object({
  /** Start date (JS Date) */
  fromDate: z.date(),
  /** End date (JS Date) */
  toDate: z.date(),
});

export type GetTripRatesByDateParams = z.infer<
  typeof getTripRatesByDateParamsSchema
>;

export const tripRatesByDateOptions = createQueryOptions({
  apiFunction: getTripRatesByDate,
  queryKey: ["wsdot", "toll-rates", "getTripRatesByDate"],
  cacheStrategy: "DAILY_STATIC",
});
