import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * TollTripRate schema
 *
 * Individual toll trip rate with message and version information.
 */
export const tollTripRateSchema = z.object({
  /** Status/message for the trip rate */
  Message: z.string().nullable().describe("Status/message for the trip rate"),
  /** Message update time */
  MessageUpdateTime: zWsdotDate().describe("Message update time"),
  /** Toll amount in cents */
  Toll: z.number().describe("Toll amount in cents"),
  /** Trip identifier */
  TripName: z.string().nullable().describe("Trip identifier"),
});

/**
 * TripRates schema
 *
 * Trip rates including versioned trip list (used by multiple endpoints).
 */
export const tripRatesSchema = z.object({
  /** Last updated time for this data (JS Date) */
  LastUpdated: zWsdotDate().describe(
    "Last updated time for this data (JS Date)"
  ),
  /** Array of trip rate objects */
  Trips: z
    .array(tollTripRateSchema)
    .nullable()
    .describe("Array of trip rate objects"),
  /** Version number for the trip rates data */
  Version: z.number().describe("Version number for the trip rates data"),
});

/** TollTripRate type */
export type TollTripRate = z.infer<typeof tollTripRateSchema>;

/** TripRates type */
export type TripRates = z.infer<typeof tripRatesSchema>;
