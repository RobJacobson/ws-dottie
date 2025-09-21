import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * TollRate schema
 *
 * Toll information for HOV toll lanes.
 */
export const tollRateSchema = z.object({
  /** Current message displayed on sign */
  CurrentMessage: z
    .string()
    .nullable()
    .describe("Current message displayed on sign"),
  /** Current toll in cents */
  CurrentToll: z.number().describe("Current toll in cents"),
  /** End latitude */
  EndLatitude: z.number().describe("End latitude"),
  /** End location name (nullable) */
  EndLocationName: z
    .string()
    .nullable()
    .describe("End location name (nullable)"),
  /** End longitude */
  EndLongitude: z.number().describe("End longitude"),
  /** End milepost */
  EndMilepost: z.number().describe("End milepost"),
  /** Start latitude */
  StartLatitude: z.number().describe("Start latitude"),
  /** Start location name (nullable) */
  StartLocationName: z
    .string()
    .nullable()
    .describe("Start location name (nullable)"),
  /** Start longitude */
  StartLongitude: z.number().describe("Start longitude"),
  /** Start milepost */
  StartMilepost: z.number().describe("Start milepost"),
  /** State route (nullable) */
  StateRoute: z.string().nullable().describe("State route (nullable)"),
  /** Time updated */
  TimeUpdated: zWsdotDate().describe("Time updated"),
  /** Travel direction (nullable) */
  TravelDirection: z
    .string()
    .nullable()
    .describe("Travel direction (nullable)"),
  /** Trip identifier (nullable) */
  TripName: z.string().nullable().describe("Trip identifier (nullable)"),
});

/** TollRate type */
export type TollRate = z.infer<typeof tollRateSchema>;

/**
 * Array of toll rates.
 */
export const tollRatesSchema = z
  .array(tollRateSchema)
  .describe(
    "Current toll rates and related metadata for WSDOT tolled corridors."
  );

export type TollRates = z.infer<typeof tollRatesSchema>;
