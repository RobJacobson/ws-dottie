import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for common toll trip information fields
 *
 * Contains common fields for toll trip information including location data and trip details
 */
export const tollTripBaseSchema = z
  .object({
    EndLatitude: z
      .number()
      .describe(
        "GPS latitude coordinate for trip end point, in decimal degrees. E.g., '47.405611347' for SR 516 intersection, '47.345427005' for SR 18 intersection."
      ),
    EndLocationName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of trip end location, as a location name. E.g., 'SR 516' for State Route 516, 'SR 18' for State Route 18, 'Stewart Rd' for street intersection, null when end location name is unavailable. Provides destination identification for toll trip queries."
      ),
    EndLongitude: z
      .number()
      .describe(
        "GPS longitude coordinate for trip end point, in decimal degrees. E.g., '-122.220730198' for SR 516 intersection, '-122.244942724' for SR 18 intersection."
      ),
    EndMilepost: z
      .number()
      .describe(
        "Milepost marker for trip end point, as a decimal. E.g., '21.94' for milepost 21.94 on route, '17.36' for milepost 17.36, '7.91' for milepost 7.91. Provides precise location reference along highway corridor for toll trip termination point."
      ),
    StartLatitude: z
      .number()
      .describe(
        "GPS latitude coordinate for trip start point, in decimal degrees. E.g., '47.458726717' for I-405 intersection, '47.427757419' for S 180th St intersection."
      ),
    StartLocationName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of trip start location, as a location name. E.g., 'I-405' for Interstate 405, 'S 180th St' for street intersection, null when start location name is unavailable. Provides origin identification for toll trip queries."
      ),
    StartLongitude: z
      .number()
      .describe(
        "GPS longitude coordinate for trip start point, in decimal degrees. E.g., '-122.217220487' for I-405 intersection, '-122.221152535' for S 180th St intersection."
      ),
    StartMilepost: z
      .number()
      .describe(
        "Milepost marker for trip start point, as a decimal. E.g., '25.65' for milepost 25.65 on route, '23.48' for milepost 23.48. Provides precise location reference along highway corridor for toll trip origin point."
      ),
    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel for toll trip, as a direction code. E.g., 'S' for southbound travel, null when travel direction is undetermined. Indicates highway direction for toll calculation and route identification."
      ),
    TripName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for toll trip route, as a trip code. E.g., 'Tmptp02565' for trip from milepost 25.65, 'Tmptp02348' for trip from milepost 23.48, null when trip name is unavailable. Used as primary key for toll trip rate queries and route identification."
      ),
  })
  .describe(
    "Represents common toll trip information including start and end location coordinates, mileposts, and trip identification. E.g., trip 'Tmptp02565' starting at I-405 milepost 25.65 (47.458726717, -122.217220487) traveling southbound to SR 516 milepost 21.94 (47.405611347, -122.220730198). Used as base schema for toll trip queries and rate calculations. Shared across multiple toll rate endpoints."
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
        "Human-readable toll rate message or display text, as a status message. E.g., 'FREE' for no-charge trips on I-405, '$4.95' for SR-520 toll amount, '$2.95' for SR-520 reduced toll, empty string when message is unavailable. Provides user-facing toll information for display."
      ),
    MessageUpdateTime: zDotnetDate().describe(
      "Timestamp when toll rate message was last updated, as a UTC datetime. E.g., '2025-11-02T19:09:32.000Z' for update at 7:09 PM on November 2, 2025. Indicates data freshness and when toll rate changes were applied."
    ),
    Toll: z
      .number()
      .describe(
        "Toll amount for trip, as dollars. E.g., '0' for free trips on I-405, '4.95' for $4.95 toll on SR-520, '2.95' for $2.95 toll on SR-520, '1.25' for $1.25 toll on SR-99. Used for toll calculation and fare display."
      ),
    TripName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for toll trip route, as a trip code. E.g., '405tp02752' for I-405 trip, '520tp00422' for SR-520 trip, '099tp03060' for SR-99 trip, null when trip name is unavailable. Used as primary key to identify specific toll trip routes for rate queries."
      ),
  })
  .describe(
    "Represents common toll trip rate information including toll amount, rate message, and update timestamp. E.g., trip '520tp00422' with toll $4.95 and message '$4.95' updated at 7:09 PM. Used as base schema for toll rate calculations and fare displays. Shared across multiple toll rate endpoints."
  );

export type TollTripRateBase = z.infer<typeof tollTripRateBaseSchema>;
