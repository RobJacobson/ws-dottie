import { z } from "zod";

import { zLatitude, zLongitude } from "@/shared/validation";

/**
 * WSDOT Weather Stations API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Weather Stations API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// WEATHER STATION DATA SCHEMA
// ============================================================================

export const weatherStationDataSchema = z
  .object({
    Latitude: zLatitude().describe(
      "Latitude coordinate of the weather station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the weather station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
    ),

    StationCode: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique numeric identifier assigned to this weather station by the WSDOT system. This code serves as a permanent, unique reference for the station across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    StationName: z
      .string()
      .describe(
        "Human-readable name for the weather station that provides quick identification. Examples include 'Snoqualmie Pass', 'Stevens Pass', 'White Pass', 'Crystal Mountain', 'Mount Baker', or 'Alpental'. This field is the primary display name used in applications."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete weather station information including location coordinates, station code, and station name. This schema represents comprehensive station data from the WSDOT Weather Stations API, providing essential information for weather station identification, mapping, and management. The station details are critical for weather monitoring systems, geographic information systems, and transportation safety applications across Washington State."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const weatherStationDataArraySchema = z
  .array(weatherStationDataSchema)
  .describe(
    "Array of weather station data for all active weather stations maintained by WSDOT across Washington State. This collection provides comprehensive station information that enables weather station identification, mapping, and management."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type WeatherStationData = z.infer<typeof weatherStationDataSchema>;
