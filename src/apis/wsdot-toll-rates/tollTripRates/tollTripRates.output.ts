import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";
import { tollTripRateBaseSchema } from "../shared/tollTripBaseSchema";

/**
 * Schema for trip rate information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tripRateSchema = tollTripRateBaseSchema.describe(
  "Represents trip rate information including trip name, toll amount, rate message, and update timestamp. E.g., trip '405tp02752' with toll $0.00 and message 'FREE' updated at 7:29 PM. Used for toll rate lookups and fare calculations."
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
      "Timestamp when toll trip rates were last updated, as a UTC datetime. E.g., '2025-11-02T19:29:33.000Z' for update at 7:29 PM on November 2, 2025. Indicates data freshness and when rate updates occurred."
    ),
    Trips: z
      .array(tripRateSchema)
      .nullable()
      .describe(
        "Array of trip rate information for all toll trips, as trip rate objects. E.g., array containing trip '405tp02752' with FREE message, trip '520tp00422' with $4.95 toll, null when trip rates are unavailable. Used for accessing all trip rates in single response."
      ),
    Version: z
      .int()
      .describe(
        "Version number of toll trips data, as an integer. E.g., '371529' for version 371529. Used for data versioning and change tracking. Increments when trip rates data is updated."
      ),
  })
  .describe(
    "Represents container for toll trip rates including last update timestamp, array of trip rates, and version number. E.g., container with version 371529, last updated at 7:29 PM, containing array of trip rates. Used for bulk toll rate access and version management."
  );

export type TollTripsRates = z.infer<typeof tollTripsRatesSchema>;
