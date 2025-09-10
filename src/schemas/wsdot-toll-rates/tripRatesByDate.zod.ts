import { z } from "zod";
import { tripRatesSchema } from "./tollTripRates.zod";

/**
 * TripRatesByDate schema
 *
 * Historical trip rates for a date range - returns array of trip rates.
 */
export const tripRatesByDateSchema = z
  .array(tripRatesSchema)
  .describe(
    "Historical trip rates for a date range - returns array of trip rates"
  );

/** TripRatesByDate type */
export type TripRatesByDate = z.infer<typeof tripRatesByDateSchema>;

/** TripRatesByDateItem type (alias for single item) */
export type TripRatesByDateItem = z.infer<typeof tripRatesSchema>;
