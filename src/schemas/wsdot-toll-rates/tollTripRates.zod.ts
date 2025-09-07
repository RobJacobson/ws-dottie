import { z } from "zod";

/**
 * TollTripRate schema
 *
 * Individual toll trip rate with message and version information.
 */
export const tollTripRateSchema = z.object({
  /** Status/message for the trip rate */
  Message: z.string().describe("Status/message for the trip rate"),
  /** Toll amount in cents */
  Toll: z.number().describe("Toll amount in cents"),
  /** Trip identifier */
  TripName: z.string().describe("Trip identifier"),
});

/**
 * TollTripRates schema
 *
 * Current toll trip rates including versioned trip list.
 */
export const tollTripRatesSchema = z.object({
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

/** TollTripRates type */
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;
