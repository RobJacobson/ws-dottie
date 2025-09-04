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
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// =========================================================================
// API Function
//
// getTripRatesByDate
// =========================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson";

/** Fetches trip rates between two dates (YYYY-MM-DD) */
export const getTripRatesByDate = async (
  params: GetTripRatesByDateParams
): Promise<TripRatesByDate> => {
  // Build query string with date parameters
  const queryParams = new URLSearchParams();
  queryParams.append("fromDate", params.fromDate.toISOString().split("T")[0]);
  queryParams.append("toDate", params.toDate.toISOString().split("T")[0]);

  const endpoint = `${ENDPOINT}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: getTripRatesByDateParamsSchema,
      output: tripRatesByDateArraySchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

// =========================================================================
// Input Schema & Types
//
// getTripRatesByDateParamsSchema
// GetTripRatesByDateParams
// =========================================================================

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

// =========================================================================
// Output Schema & Types
// =========================================================================

/** Trip entry schema within historical rates */
export const tripRateEntrySchema = z.object({
  /** Message text (e.g., FREE, $x.xx, empty) */
  Message: z.string(),
  /** Message update time (JS Date) */
  MessageUpdateTime: zWsdotDate(),
  /** Toll amount in dollars */
  Toll: z.number(),
  /** Trip identifier */
  TripName: z.string(),
});

/** Historical item schema (versioned snapshot) */
export const tripRatesByDateItemSchema = z.object({
  /** Last updated time for this snapshot (JS Date) */
  LastUpdated: zWsdotDate(),
  /** Trip entries */
  Trips: z.array(tripRateEntrySchema),
  /** Version number */
  Version: z.number(),
});

/** Historical trip rates array schema */
export const tripRatesByDateArraySchema = z.array(tripRatesByDateItemSchema);

/** TripRateEntry type */
export type TripRateEntry = z.infer<typeof tripRateEntrySchema>;

/** TripRatesByDateItem type */
export type TripRatesByDateItem = z.infer<typeof tripRatesByDateItemSchema>;

/** TripRatesByDate type */
export type TripRatesByDate = z.infer<typeof tripRatesByDateArraySchema>;

// =========================================================================
// TanStack Query Options
// =========================================================================

export const tripRatesByDateOptions = (params: GetTripRatesByDateParams) =>
  queryOptions({
    queryKey: [
      "wsdot",
      "toll-rates",
      "getTripRatesByDate",
      {
        ...params,
        fromDate:
          params.fromDate instanceof Date
            ? params.fromDate.toISOString().split("T")[0]
            : params.fromDate,
        toDate:
          params.toDate instanceof Date
            ? params.toDate.toISOString().split("T")[0]
            : params.toDate,
      },
    ],
    queryFn: () => getTripRatesByDate(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
