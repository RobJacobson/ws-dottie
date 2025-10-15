import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for trip rate information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tripRateSchema = z
  .object({
    /** Message for the trip rate. */
    Message: z.string().nullable().describe("Message for the trip rate."),
    /** Time when the message was last updated. */
    MessageUpdateTime: zDotnetDate().describe(
      "Time when the message was last updated."
    ),
    /** The toll amount for the trip. */
    Toll: z.number().describe("The toll amount for the trip."),
    /** Name of the trip. */
    TripName: z.string().nullable().describe("Name of the trip."),
  })
  .describe("Schema for trip rate information");

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
