import { z } from "@/shared/zod";

/**
 * Schema for common toll trip information fields
 *
 * Contains common fields for toll trip information including location data and trip details
 */
export const tollTripBaseSchema = z
  .object({
    EndLatitude: z
      .number()
      .describe("Latitude of trip end point in decimal degrees."),
    EndLocationName: z
      .string()
      .nullable()
      .describe("Display name of trip end location (e.g., 'SR 516', 'SR 18')."),
    EndLongitude: z
      .number()
      .describe("Longitude of trip end point in decimal degrees."),
    EndMilepost: z.number().describe("Milepost marker for trip end point."),
    StartLatitude: z
      .number()
      .describe("Latitude of trip start point in decimal degrees."),
    StartLocationName: z
      .string()
      .nullable()
      .describe(
        "Display name of trip start location (e.g., 'I-405', 'S 180th St')."
      ),
    StartLongitude: z
      .number()
      .describe("Longitude of trip start point in decimal degrees."),
    StartMilepost: z.number().describe("Milepost marker for trip start point."),
    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel code (e.g., 'S' for southbound, 'N' for northbound)."
      ),
    TripName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for toll trip route (e.g., 'Tmptp02565', '099tp03268')."
      ),
  })
  .describe(
    "Common toll trip information including start and end locations, coordinates, and trip identification."
  );

export type TollTripBase = z.infer<typeof tollTripBaseSchema>;

/**
 * Schema for common toll trip rate information fields
 *
 * Contains common fields for toll trip rates
 */
export const tollTripRateBaseSchema = z
  .object({
    Message: z
      .string()
      .nullable()
      .describe(
        "Toll rate message or display text (e.g., 'FREE', '$4.95'). Empty string when unavailable."
      ),
    MessageUpdateTime: z.date().describe(
      "UTC datetime when toll rate message was last updated."
    ),
    Toll: z.number().describe("Toll amount for trip in dollars."),
    TripName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for toll trip route (e.g., '405tp02752', '520tp00422', '099tp03060')."
      ),
  })
  .describe(
    "Common toll trip rate information including toll amount, message, and update timestamp."
  );

export type TollTripRateBase = z.infer<typeof tollTripRateBaseSchema>;
