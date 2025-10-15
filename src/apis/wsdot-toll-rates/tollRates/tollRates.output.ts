import { z } from "zod";
import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";

/**
 * Schema for toll rate information for HOV toll lanes
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollRateSchema = z
  .object({
    /** Name for the toll trip. */
    TripName: z.string().nullable().describe("Name for the toll trip."),
    /**
     * The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available.
     */
    CurrentToll: z
      .int()
      .describe(
        "The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available."
      ),
    /** Message displayed on the sign in place of a toll. */
    CurrentMessage: z
      .string()
      .nullable()
      .describe("Message displayed on the sign in place of a toll."),
    /** Route the toll applies to. */
    StateRoute: z.string().nullable().describe("Route the toll applies to."),
    /** Travel direction the toll applies to. */
    TravelDirection: z
      .string()
      .nullable()
      .describe("Travel direction the toll applies to."),
    /** The start milepost for a toll trip. */
    StartMilepost: z.number().describe("The start milepost for a toll trip."),
    /** Common name of the start location. */
    StartLocationName: z
      .string()
      .nullable()
      .describe("Common name of the start location."),
    /** Approximate geographical latitude of the start location. */
    StartLatitude: z
      .number()
      .describe("Approximate geographical latitude of the start location."),
    /** Approximate geographical longitude of the start location. */
    StartLongitude: z
      .number()
      .describe("Approximate geographical longitude of the start location."),
    /** The end milepost for a toll trip. */
    EndMilepost: z.number().describe("The end milepost for a toll trip."),
    /** Common name of the end location. */
    EndLocationName: z
      .string()
      .nullable()
      .describe("Common name of the end location."),
    /** Approximate geographical latitude of the end location. */
    EndLatitude: z
      .number()
      .describe("Approximate geographical latitude of the end location."),
    /** Approximate geographical longitude of the end location. */
    EndLongitude: z
      .number()
      .describe("Approximate geographical longitude of the end location."),
    /** Last time updated for this toll trip. */
    TimeUpdated: zDotnetDate().describe(
      "Last time updated for this toll trip."
    ),
  })
  .describe("Schema for toll rate information for HOV toll lanes");

export type TollRate = z.infer<typeof tollRateSchema>;
