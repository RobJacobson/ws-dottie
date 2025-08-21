import { z } from "zod";

import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

/**
 * WSDOT Toll Rates API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Toll Rates API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// TOLL RATE SCHEMA
// ============================================================================

export const tollRateSchema = z
  .object({
    CurrentMessage: zNullableString().describe(
      "Current system message or notification related to the toll facility. May be null if no message is currently active. Examples include 'System maintenance', 'Holiday rates in effect', or 'Electronic tolling only'."
    ),

    CurrentToll: z
      .number()
      .describe(
        "Current toll amount in cents for the facility. This field shows the active pricing for the toll route. Examples include 125 (for $1.25), 250 (for $2.50), or 0 (for free travel)."
      ),

    EndLatitude: zLatitude().describe(
      "Latitude coordinate of the toll facility endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the toll facility terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndLocationName: z
      .string()
      .describe(
        "Name of the location where the toll facility ends. Examples include 'Bellevue', 'Seattle', 'Tacoma', or 'Everett'. This field helps users identify the destination point of the toll route."
      ),

    EndLongitude: zLongitude().describe(
      "Longitude coordinate of the toll facility endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the toll facility terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndMilepost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the toll facility ends. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    StartLatitude: zLatitude().describe(
      "Latitude coordinate of the toll facility starting point in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the toll facility origin. Essential for GPS navigation and geographic information systems."
    ),

    StartLocationName: z
      .string()
      .describe(
        "Name of the location where the toll facility begins. Examples include 'Bellevue', 'Seattle', 'Tacoma', or 'Everett'. This field helps users identify the starting point of the toll route."
      ),

    StartLongitude: zLongitude().describe(
      "Longitude coordinate of the toll facility starting point in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the toll facility origin. Essential for GPS navigation and geographic information systems."
    ),

    StartMilepost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the toll facility begins. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    StateRoute: z
      .string()
      .describe(
        "State route identifier for the toll facility. Examples include '405', '520', '167', or '509'. This field helps users identify which highway the toll facility operates on."
      ),

    TimeUpdated: zWsdotDate().describe(
      "Timestamp indicating when this toll rate information was last updated in the WSDOT system. This field shows the currency of the pricing data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    TravelDirection: z
      .string()
      .describe(
        "Direction of travel for which the toll rate applies. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', or 'All Lanes'. This field indicates which direction of travel is subject to the toll."
      ),

    TripName: z
      .string()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '405tp01351', '520tp00123', or '167tp00456'. This field serves as a reference for the specific toll route and can be used for tracking and correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete toll rate information including pricing, location details, and facility information. This schema represents comprehensive toll data from the WSDOT Toll Rates API, providing essential information for toll facility management, pricing transparency, and travel planning. The toll details are critical for real-time pricing updates, route planning, and transportation cost management."
  );

// ============================================================================
// TOLL TRIP INFO SCHEMA
// ============================================================================

export const tollTripInfoSchema = z
  .object({
    EndLatitude: zLatitude().describe(
      "Latitude coordinate of the toll trip endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndLocationName: z
      .string()
      .describe(
        "Name of the location where the toll trip ends. Examples include 'Bellevue', 'Seattle', 'Tacoma', or 'Everett'. This field helps users identify the destination point of the toll trip."
      ),

    EndLongitude: zLongitude().describe(
      "Longitude coordinate of the toll trip endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndMilepost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the toll trip ends. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    Geometry: z
      .string()
      .describe(
        "Geometric representation of the toll trip route, typically in Well-Known Text (WKT) format or similar coordinate string format. This field provides the spatial path of the toll route for mapping and visualization applications."
      ),

    ModifiedDate: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp indicating when this trip information was last modified in the WSDOT system. May be null if no modification date is available. This field shows when the route or facility information was last updated. All times are in Pacific Time Zone."
      ),

    StartLatitude: zLatitude().describe(
      "Latitude coordinate of the toll trip starting point in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip origin. Essential for GPS navigation and geographic information systems."
    ),

    StartLocationName: z
      .string()
      .describe(
        "Name of the location where the toll trip begins. Examples include 'Bellevue', 'Seattle', 'Tacoma', or 'Everett'. This field helps users identify the starting point of the toll trip."
      ),

    StartLongitude: zLongitude().describe(
      "Longitude coordinate of the toll trip starting point in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip origin. Essential for GPS navigation and geographic information systems."
    ),

    StartMilepost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the toll trip begins. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    TravelDirection: z
      .string()
      .describe(
        "Direction of travel for which the toll trip applies. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', or 'All Lanes'. This field indicates which direction of travel the trip information applies to."
      ),

    TripName: z
      .string()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '405tp01351', '520tp00123', or '167tp00456'. This field serves as a reference for the specific toll route and can be used for tracking and correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed toll trip information including location details, geometry data, and route information. This schema represents comprehensive trip data from the WSDOT Toll Rates API, providing essential information for toll route mapping, navigation applications, and facility management. The trip details are critical for spatial analysis, route visualization, and transportation planning."
  );

// ============================================================================
// TOLL TRIP RATE SCHEMA
// ============================================================================

export const tollTripRateSchema = z
  .object({
    Message: z
      .string()
      .describe(
        "System message or notification related to the specific toll trip. Examples include 'Normal rates', 'Holiday rates in effect', 'Maintenance mode', or 'Electronic tolling only'. This field provides important context about the current status of the toll route."
      ),

    MessageUpdateTime: zWsdotDate().describe(
      "Timestamp indicating when the system message was last updated for this toll trip. This field shows the currency of the message information and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    Toll: z
      .number()
      .describe(
        "Current toll amount in cents for the specific trip. This field shows the active pricing for the toll route. Examples include 125 (for $1.25), 250 (for $2.50), or 0 (for free travel)."
      ),

    TripName: z
      .string()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '405tp01351', '520tp00123', or '167tp00456'. This field serves as a reference for the specific toll route and can be used for tracking and correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Individual toll trip rate information including pricing, system messages, and update timestamps. This schema represents specific trip pricing data from the WSDOT Toll Rates API, providing essential information for real-time toll pricing, system status monitoring, and travel cost planning."
  );

// ============================================================================
// TOLL TRIP RATES SCHEMA
// ============================================================================

export const tollTripRatesSchema = z
  .object({
    LastUpdated: zWsdotDate().describe(
      "Timestamp indicating when the overall toll trip rates system was last updated in the WSDOT system. This field shows the currency of all pricing data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    Trips: z
      .array(tollTripRateSchema)
      .describe(
        "Array of individual toll trip rate information for all active toll routes. This collection provides comprehensive pricing data that enables real-time toll monitoring, cost planning, and transportation management."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete toll trip rates information including system-wide update time and all individual trip pricing data. This schema represents comprehensive pricing information from the WSDOT Toll Rates API, providing essential data for toll system monitoring, pricing transparency, and travel cost management across all toll facilities."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const tollRateArraySchema = z
  .array(tollRateSchema)
  .describe(
    "Array of toll rate data for all active toll facilities across Washington State. This collection provides comprehensive pricing information that enables toll facility management, pricing transparency, and travel planning."
  );

export const tollTripInfoArraySchema = z
  .array(tollTripInfoSchema)
  .describe(
    "Array of toll trip information data for all active toll routes across Washington State. This collection provides comprehensive route information that enables toll route mapping, navigation applications, and facility management."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type TollRate = z.infer<typeof tollRateSchema>;
export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;
export type TollTripRate = z.infer<typeof tollTripRateSchema>;
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;
