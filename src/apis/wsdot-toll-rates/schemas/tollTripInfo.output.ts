import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for toll trip information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripInfoSchema = z
  .object({
    /** End latitude of the trip. */
    EndLatitude: z.number().describe("End latitude of the trip."),
    /** Name of the end location. */
    EndLocationName: z
      .string()
      .nullable()
      .describe("Name of the end location."),
    /** End longitude of the trip. */
    EndLongitude: z.number().describe("End longitude of the trip."),
    /** End milepost of the trip. */
    EndMilepost: z.number().describe("End milepost of the trip."),
    /** Geometry information for the trip. */
    Geometry: z
      .string()
      .nullable()
      .describe("Geometry information for the trip."),
    /** Date when the trip information was last modified. */
    ModifiedDate: zDotnetDate().describe(
      "Date when the trip information was last modified."
    ),
    /** Start latitude of the trip. */
    StartLatitude: z.number().describe("Start latitude of the trip."),
    /** Name of the start location. */
    StartLocationName: z
      .string()
      .nullable()
      .describe("Name of the start location."),
    /** Start longitude of the trip. */
    StartLongitude: z.number().describe("Start longitude of the trip."),
    /** Start milepost of the trip. */
    StartMilepost: z.number().describe("Start milepost of the trip."),
    /** Direction of travel for the trip. */
    TravelDirection: z
      .string()
      .nullable()
      .describe("Direction of travel for the trip."),
    /** Name of the trip. */
    TripName: z.string().nullable().describe("Name of the trip."),
  })
  .describe("Schema for toll trip information");

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;
