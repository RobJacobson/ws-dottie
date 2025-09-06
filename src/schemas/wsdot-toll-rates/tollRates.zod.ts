import { z } from "zod";

/**
 * TollRate schema
 *
 * Toll information for HOV toll lanes.
 */
export const tollRateSchema = z.object({
  /** Current toll in cents */
  CurrentToll: z.number().describe("Current toll in cents"),
  /** End location name (nullable) */
  EndLocationName: z
    .string()
    .nullable()
    .describe("End location name (nullable)"),
  /** End milepost */
  EndMilepost: z.number().describe("End milepost"),
  /** Start location name (nullable) */
  StartLocationName: z
    .string()
    .nullable()
    .describe("Start location name (nullable)"),
  /** Start milepost */
  StartMilepost: z.number().describe("Start milepost"),
  /** State route (nullable) */
  StateRoute: z.string().nullable().describe("State route (nullable)"),
  /** Travel direction (nullable) */
  TravelDirection: z
    .string()
    .nullable()
    .describe("Travel direction (nullable)"),
  /** Trip identifier (nullable) */
  TripName: z.string().nullable().describe("Trip identifier (nullable)"),
});

/**
 * TollRates schema
 *
 * Current toll rates and related metadata for WSDOT tolled corridors.
 */
export const tollRatesSchema = z
  .array(tollRateSchema)
  .describe(
    "Current toll rates and related metadata for WSDOT tolled corridors."
  );

/** TollRate type */
export type TollRate = z.infer<typeof tollRateSchema>;

/** TollRates type */
export type TollRates = z.infer<typeof tollRatesSchema>;
