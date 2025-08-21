import { z } from "zod";

import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

/**
 * WSDOT Border Crossings API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Border Crossings API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// BORDER CROSSING LOCATION SCHEMA
// ============================================================================

export const borderCrossingLocationSchema = z
  .object({
    Description: z
      .string()
      .describe(
        "Human-readable description of the border crossing location. Provides context about the crossing point, such as 'Peace Arch Border Crossing' or 'Pacific Highway Border Crossing'. This field helps users identify the specific location of the border crossing."
      ),

    Direction: zNullableString().describe(
      "Direction of travel for the border crossing, indicating whether it's for northbound (entering Canada) or southbound (entering US) traffic. May be null if direction information is not available or not applicable to the crossing."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the border crossing location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning. Border crossings are typically located along the 49th parallel between Washington State and British Columbia."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the border crossing location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning. Border crossings are typically located between approximately -123.0 and -122.0 degrees West in the Washington-British Columbia region."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway or road where the border crossing is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .describe(
        "Name of the highway or road where the border crossing is located. Examples include 'I-5', 'SR 543', or 'Peace Arch Drive'. This field helps users understand which roadway leads to the border crossing."
      ),
  })
  .catchall(z.unknown())
  .nullable()
  .describe(
    "Geographic and descriptive information about a border crossing location. Contains coordinates, road information, and descriptive details that help identify and locate the specific border crossing point. May be null if location information is not available for a particular crossing."
  );

// ============================================================================
// BORDER CROSSING DATA SCHEMA
// ============================================================================

export const borderCrossingDataSchema = z
  .object({
    BorderCrossingLocation: borderCrossingLocationSchema.describe(
      "Detailed location information for the border crossing including coordinates, road details, and descriptive text. This object provides comprehensive geographic context for the crossing location."
    ),

    CrossingName: z
      .string()
      .describe(
        "Official name of the border crossing as designated by border authorities. Examples include 'Peace Arch', 'Pacific Highway', 'Lynden', and 'Sumas'. This is the primary identifier used by travelers and border officials to reference specific crossing points."
      ),

    Time: zWsdotDate().describe(
      "Timestamp indicating when the wait time data was last updated by the WSDOT border monitoring system. This field shows how current the wait time information is, helping users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    WaitTime: z
      .number()
      .describe(
        "Current estimated wait time in minutes for vehicles crossing the border at this location. This is the primary data point that travelers use to plan their border crossing timing. Wait times can vary significantly based on time of day, day of week, and current border traffic conditions."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete border crossing information including location details, crossing name, current wait time, and timestamp. This schema represents the core data structure returned by the WSDOT Border Crossings API, providing real-time information that travelers use to plan their border crossing timing and route selection."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const borderCrossingDataArraySchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Array of border crossing data for all monitored border crossings between Washington State and Canada. This collection provides comprehensive wait time and location information for travelers planning border crossings, enabling route planning and timing optimization."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;
export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;
