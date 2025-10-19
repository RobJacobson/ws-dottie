import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { tollTripRateBaseSchema } from "../shared/tollTripBaseSchema";

/**
 * Schema for trip rate information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tripRateSchema = tollTripRateBaseSchema.describe(
  "Schema for trip rate information"
);

export type TripRate = z.infer<typeof tripRateSchema>;

/**
 * Schema for toll trips container
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripsRatesSchema = z
  .object({
    /** Last time the toll trips were updated. */
    LastUpdated: zDotnetDate().describe(
      "Last time the toll trips were updated."
    ),
    /** List of trip rates. */
    Trips: z.array(tripRateSchema).nullable().describe("List of trip rates."),
    /** Version number of the toll trips data. */
    Version: z.int().describe("Version number of the toll trips data."),
  })
  .describe("Schema for toll trips container");

export type TollTripsRates = z.infer<typeof tollTripsRatesSchema>;
