import { z } from "zod";

import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/validation";

/**
 * WSDOT Mountain Pass Conditions API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Mountain Pass Conditions API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// TRAVEL RESTRICTION SCHEMA
// ============================================================================

export const travelRestrictionSchema = z
  .object({
    TravelDirection: z
      .string()
      .describe(
        "Direction of travel for which the restriction applies. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', or 'All Lanes'. This field indicates which direction of travel is affected by the restriction."
      ),

    RestrictionText: z
      .string()
      .describe(
        "Detailed description of the travel restriction or requirement. This field contains the specific text explaining what restrictions are in place, such as 'Chains required', '4WD/AWD only', 'No trailers', or 'Passenger vehicles only'."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Travel restriction information for a specific direction on a mountain pass. Contains details about what vehicles or travel conditions are allowed or restricted on the pass."
  );

// ============================================================================
// MOUNTAIN PASS CONDITION SCHEMA
// ============================================================================

export const mountainPassConditionSchema = z
  .object({
    DateUpdated: zWsdotDate().describe(
      "Timestamp indicating when this mountain pass condition information was last updated in the WSDOT system. This field shows the currency of the condition data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    ElevationInFeet: z
      .number()
      .describe(
        "Elevation of the mountain pass in feet above sea level. This field provides important context for understanding the altitude where the conditions apply, which is crucial for weather-related travel planning and safety considerations."
      ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the mountain pass location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the pass. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the mountain pass location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the pass. Essential for GPS navigation and geographic information systems."
    ),

    MountainPassId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this mountain pass by the WSDOT system. This ID serves as a permanent, unique reference for the pass across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    MountainPassName: z
      .string()
      .describe(
        "Official name of the mountain pass. Examples include 'Snoqualmie Pass', 'Stevens Pass', 'White Pass', 'Chinook Pass', or 'Cayuse Pass'. This field provides the recognizable name used by travelers and transportation officials."
      ),

    RestrictionOne: travelRestrictionSchema.describe(
      "Primary travel restriction information for the mountain pass. This object contains the main restriction details including direction and specific requirements that travelers need to be aware of."
    ),

    RestrictionTwo: travelRestrictionSchema.describe(
      "Secondary travel restriction information for the mountain pass. This object contains additional restriction details that may apply to different directions or vehicle types on the pass."
    ),

    RoadCondition: z
      .string()
      .describe(
        "Current condition of the roadway surface on the mountain pass. Examples include 'Bare and wet', 'Compact snow and ice', 'Bare and dry', 'Loose snow', or 'Ice'. This field is critical for safe travel planning and vehicle preparation."
      ),

    TemperatureInFahrenheit: zNullableNumber().describe(
      "Current temperature at the mountain pass in degrees Fahrenheit. May be null if temperature information is not available or not applicable. This field helps travelers prepare for weather conditions and understand the current environmental situation."
    ),

    TravelAdvisoryActive: z
      .boolean()
      .describe(
        "Indicates whether an active travel advisory is currently in effect for the mountain pass. True means there is an active advisory that travelers should be aware of, False means no special travel advisories are currently in effect."
      ),

    WeatherCondition: z
      .string()
      .describe(
        "Current weather conditions at the mountain pass. Examples include 'Snowing', 'Raining', 'Clear', 'Foggy', 'Windy', or 'Mixed precipitation'. This field provides essential information for understanding the current weather situation affecting travel."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete mountain pass condition information including location, weather, road conditions, and travel restrictions. This schema represents comprehensive condition data from the WSDOT Mountain Pass Conditions API, providing essential information for safe mountain travel planning, winter driving preparation, and transportation safety. The condition details are critical for real-time travel monitoring, route planning, and emergency response coordination in mountainous areas."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const mountainPassConditionArraySchema = z
  .array(mountainPassConditionSchema)
  .describe(
    "Array of mountain pass condition data for all active passes across Washington State. This collection provides comprehensive condition information that enables safe mountain travel planning, winter driving preparation, and transportation safety management."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;
export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;
