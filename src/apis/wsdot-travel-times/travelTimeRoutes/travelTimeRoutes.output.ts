/**
 * @fileoverview WSDOT Travel Times API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Travel Times API, which provides current travel times for covered routes
 * in Seattle, Tacoma, and Snoqualmie Pass areas.
 */

import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for TravelTimeRoute - represents a travel time route
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const travelTimeRouteSchema = z
  .object({
    AverageTime: z
      .number()
      .describe(
        "Average travel time to complete route based on historical data, as minutes. E.g., '30' for 30 minutes average on Everett-Seattle HOV route, '25' for 25 minutes average on Seattle-Everett route, '9' for 9 minutes average on Bellevue-Issaquah route. Used for comparing current conditions to typical travel times."
      ),
    CurrentTime: z
      .number()
      .describe(
        "Current estimated travel time to complete route based on real-time conditions, as minutes. E.g., '33' for 33 minutes current time on Everett-Seattle route, '26' for 26 minutes current time on Seattle-Everett HOV route, '9' for 9 minutes current time on Bellevue-Issaquah route. Reflects real-time traffic conditions and congestion."
      ),
    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of travel time route, as a route description. E.g., 'Everett to Downtown Seattle using HOV lanes' for HOV route, 'Downtown Bellevue to Issaquah' for standard route, null when description is unavailable. Provides context about route purpose and characteristics."
      ),
    Distance: z
      .number()
      .describe(
        "Total route distance from start to end point, as miles. E.g., '26.72' for 26.72 miles on Everett-Seattle route, '9.28' for 9.28 miles on Bellevue-Issaquah route, '26.94' for 26.94 miles on Seattle-Everett route. Used for calculating average speed and route planning."
      ),
    EndPoint: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location where travel time route ends, as a roadway location object. E.g., I-5 at University St in Seattle (milepost 165.83) for Everett-Seattle route, I-90 at Front St in Issaquah (milepost 16.96) for Bellevue-Issaquah route, null when end point is unavailable. Provides destination location for route."
      ),
    Name: z
      .string()
      .nullable()
      .describe(
        "Human-readable name identifier for travel time route, as a route name. E.g., 'Everett-Seattle HOV' for HOV route, 'Seattle-Everett' for standard route, 'Bellevue-Issaquah' for Bellevue to Issaquah route, null when route name is unavailable. Used for route identification and display."
      ),
    StartPoint: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location where travel time route begins, as a roadway location object. E.g., I-5 at 41st St in Everett (milepost 192.55) for Everett-Seattle route, I-405 at NE 8th St in Bellevue (milepost 13.33) for Bellevue-Issaquah route, null when start point is unavailable. Provides origin location for route."
      ),
    TimeUpdated: zDotnetDate().describe(
      "Timestamp when travel time data was last updated, as a UTC datetime. E.g., '2025-11-02T19:25:00.000Z' for update at 7:25 PM on November 2, 2025. Indicates data freshness and when travel time calculation occurred."
    ),
    TravelTimeID: z
      .number()
      .describe(
        "Unique identifier for travel time route, as an integer ID. E.g., '1' for Everett-Seattle route, '2' for Everett-Seattle HOV route, '5' for Bellevue-Issaquah route. Used as primary key for route identification and lookups."
      ),
  })
  .describe(
    "Represents travel time route information including current and average travel times, route distance, start/end point locations, and update timestamp. E.g., Everett-Seattle HOV route (ID 2) from Everett to Seattle with current time 33 minutes, average time 30 minutes, distance 26.72 miles. Used for route planning, travel time monitoring, and comparing current conditions to historical averages. Coverage includes Seattle, Tacoma, and Snoqualmie Pass areas. Data updated periodically to reflect current traffic conditions."
  );

// Export types
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;
