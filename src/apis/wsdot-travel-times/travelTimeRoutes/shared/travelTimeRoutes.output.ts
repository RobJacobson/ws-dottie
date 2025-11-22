/**
 * @fileoverview WSDOT Travel Times API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Travel Times API, which provides current travel times for covered routes
 * in Seattle, Tacoma, and Snoqualmie Pass areas.
 */

import { roadwayLocationSchema } from "@/apis/shared";
import { z } from "@/shared/zod";

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
        "Average travel time to complete the route in minutes based on historical data."
      ),
    CurrentTime: z
      .number()
      .describe(
        "Current estimated travel time to complete the route in minutes based on real-time conditions."
      ),
    Description: z
      .string()
      .nullable()
      .describe("Human-readable description of the travel time route."),
    Distance: z
      .number()
      .describe("Total route distance from start to end point in miles."),
    EndPoint: roadwayLocationSchema
      .nullable()
      .describe("Roadway location where the travel time route ends."),
    Name: z
      .string()
      .nullable()
      .describe("Display name of the travel time route."),
    StartPoint: roadwayLocationSchema
      .nullable()
      .describe("Roadway location where the travel time route begins."),
    TimeUpdated: z.date().describe(
      "UTC datetime when the travel time data was last updated."
    ),
    TravelTimeID: z.number().describe("Numeric ID of the travel time route."),
  })
  .describe(
    "Travel time route information including current and average travel times, route distance, start/end point locations, and update timestamp."
  );

// Export types
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;
