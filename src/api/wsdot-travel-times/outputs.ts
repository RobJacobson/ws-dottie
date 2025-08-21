import { z } from "zod";

import { zLatitude, zLongitude, zWsdotDate } from "@/shared/validation";

/**
 * WSDOT Travel Times API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Travel Times API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// TRAVEL TIME ENDPOINT SCHEMA
// ============================================================================

export const travelTimeEndpointSchema = z
  .object({
    Description: z
      .string()
      .describe(
        "Human-readable description of the travel time endpoint location. Examples include 'Northbound lanes', 'Bridge approach', 'Tunnel entrance', 'Interchange with SR 520', or 'Mountain pass overlook'. This field provides context about where the endpoint is positioned."
      ),

    Direction: z
      .string()
      .describe(
        "Direction of travel indicator for the travel time endpoint. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', 'All Lanes', or 'Eastbound and Westbound'. This field indicates which direction of travel the endpoint represents."
      ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the travel time endpoint location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the endpoint. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the travel time endpoint location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the endpoint. Essential for GPS navigation and geographic information systems."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the travel time endpoint is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .describe(
        "Name of the highway or road where the travel time endpoint is located. Examples include 'I-5', 'SR 520', 'US-2', 'I-90', or 'SR 9'. This field helps users identify which roadway the endpoint represents."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Geographic and descriptive information about a travel time endpoint location where travel time monitoring begins or ends. Contains coordinates, road information, and descriptive details that help identify and locate the specific endpoint point."
  );

// ============================================================================
// TRAVEL TIME ROUTE SCHEMA
// ============================================================================

export const travelTimeRouteSchema = z
  .object({
    AverageTime: z
      .number()
      .describe(
        "Average travel time for the route in minutes under normal traffic conditions. This field represents the typical travel time that drivers can expect when traffic is flowing normally, providing a baseline for comparison with current conditions."
      ),

    CurrentTime: z
      .number()
      .describe(
        "Current travel time for the route in minutes based on real-time traffic conditions. This field shows the actual travel time that drivers can expect right now, which may be higher or lower than the average time depending on current traffic congestion."
      ),

    Description: z
      .string()
      .describe(
        "Human-readable description of the travel time route. Examples include 'I-5 from Seattle to Tacoma', 'SR 520 from Bellevue to Seattle', or 'I-90 from Seattle to Issaquah'. This field provides context about what the route represents."
      ),

    Distance: z
      .number()
      .describe(
        "Distance of the travel time route in miles. This field shows the total length of the monitored route segment, providing context for understanding the travel time data and calculating average speeds."
      ),

    EndPoint: travelTimeEndpointSchema.describe(
      "Destination endpoint information for the travel time route. This object contains the ending location coordinates and descriptive details for the route."
    ),

    Name: z
      .string()
      .describe(
        "Human-readable name for the travel time route that provides quick identification. Examples include 'I-5 Seattle to Tacoma', 'SR 520 Bellevue to Seattle', or 'I-90 Seattle to Issaquah'. This field is the primary display name used in applications."
      ),
    StartPoint: travelTimeEndpointSchema.describe(
      "Starting endpoint information for the travel time route. This object contains the beginning location coordinates and descriptive details for the route."
    ),

    TimeUpdated: zWsdotDate().describe(
      "Timestamp indicating when this travel time information was last updated in the WSDOT system. This field shows the currency of the travel time data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    TravelTimeID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this travel time route by the WSDOT system. This ID serves as a permanent, unique reference for the route across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete travel time route information including current and average travel times, route details, and endpoint information. This schema represents comprehensive travel time data from the WSDOT Travel Times API, providing essential information for route planning, congestion monitoring, and travel time estimation. The travel time details are critical for real-time navigation, traffic management, and transportation planning systems."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const travelTimesArraySchema = z
  .array(travelTimeRouteSchema)
  .describe(
    "Array of travel time route data for all monitored routes across Washington State. This collection provides comprehensive travel time information that enables route planning, congestion monitoring, and travel time estimation."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type TravelTimeEndpoint = z.infer<typeof travelTimeEndpointSchema>;
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;
export type TravelTimesResponse = z.infer<typeof travelTimesArraySchema>;
