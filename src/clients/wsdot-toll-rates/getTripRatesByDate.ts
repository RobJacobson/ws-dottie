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
 *     - FromDate: Start date (JS Date)
 *     - ToDate: End date (JS Date)
 *
 * @output
 *   - getTripRatesByDate: TripRatesByDate
 *
 * @cli
 *   - Dates as strings are accepted; the CLI converts YYYY-MM-DD to JS Date.
 *   - Examples:
 *     - node dist/cli.mjs getTripRatesByDate '{"FromDate":"2025-08-01","ToDate":"2025-08-02"}'
 *     - node dist/cli.mjs getTripRatesByDate '{"FromDate":"2025-09-03","ToDate":"2025-09-03"}'
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
  tripRatesByDateSchema,
} from "@/schemas/wsdot-toll-rates/tripRatesByDate.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils/dateUtils";

/** Input schema for getTripRatesByDate */
const tripRatesByDateInput = z.object({
  /** Start date (YYYY-MM-DD string) */
  FromDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  /** End date (YYYY-MM-DD string) */
  ToDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getTripRatesByDate */
export const getTripRatesByDateMeta: EndpointDefinition<
  TripRatesByDateInput,
  TripRatesByDate
> = {
  api: "wsdot-toll-rates",
  function: "getTripRatesByDate",
  endpoint:
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
  inputSchema: tripRatesByDateInput,
  outputSchema: tripRatesByDateSchema,
  sampleParams: {
    FromDate: datesHelper.startOfMonth(),
    ToDate: datesHelper.yesterday(),
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type TripRatesByDateInput = z.infer<typeof tripRatesByDateInput>;
