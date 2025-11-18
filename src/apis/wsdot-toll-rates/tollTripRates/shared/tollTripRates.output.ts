import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";
import { tollTripRateBaseSchema } from "../../shared/tollTripBaseSchema";

/**
 * Schema for trip rate information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tripRateSchema = tollTripRateBaseSchema.describe(
  "Toll rate information for a single trip including toll amount, message, and update timestamp."
);

export type TripRate = z.infer<typeof tripRateSchema>;

/**
 * Schema for toll trips container
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripsRatesSchema = z
  .object({
    LastUpdated: zDotnetDate().describe(
      "UTC datetime when toll trip rates were last updated."
    ),
    Trips: z
      .array(tripRateSchema)
      .nullable()
      .describe(
        "Array of trip rate information for all toll trips. Null when trip rates are unavailable."
      ),
    Version: z
      .int()
      .describe(
        "Version number of toll trips data. Increments when trip rates data is updated."
      ),
  })
  .describe(
    "Container for toll trip rates including update timestamp, array of trip rates, and version number."
  );

export type TollTripsRates = z.infer<typeof tollTripsRatesSchema>;
