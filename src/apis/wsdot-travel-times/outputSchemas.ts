/**
 * @fileoverview WSDOT Travel Times API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Travel Times API, which provides current travel times for covered routes
 * in Seattle, Tacoma, and Snoqualmie Pass areas.
 */

import { z } from "zod";

import { RoadwayLocationSchema, zWsdotDate } from "@/apis/shared";

/**
 * Schema for TravelTimeRoute - represents a travel time route
 *
 * Data structure that represents a travel time route. Provides current travel
 * times for many popular travel routes around Washington State.
 */
export const TravelTimeRouteSchema = z.object({
  AverageTime: z
    .number()
    .describe(
      "The average time in minutes that it takes to complete this route."
    ),
  CurrentTime: z
    .number()
    .describe(
      "The current estimated time in minutes that it takes to complete this route."
    ),
  Description: z.string().nullable().describe("A description for the route."),
  Distance: z.number().describe("Total distance of this route in miles."),
  EndPoint: RoadwayLocationSchema.nullable().describe(
    "The location where this route ends."
  ),
  Name: z.string().nullable().describe("A friendly name for the route."),
  StartPoint: RoadwayLocationSchema.nullable().describe(
    "The location where this route begins."
  ),
  TimeUpdated: zWsdotDate().describe(
    "The last time that the data for this route was updated."
  ),
  TravelTimeID: z.number().describe("Unique ID that is specific to a route."),
});

/**
 * Schema for ArrayOfTravelTimeRoute - the main response array for GetTravelTimes
 */
export const ArrayOfTravelTimeRouteSchema = z.array(TravelTimeRouteSchema);

// Export types
export type TravelTimeRoute = z.infer<typeof TravelTimeRouteSchema>;
export type ArrayOfTravelTimeRoute = z.infer<
  typeof ArrayOfTravelTimeRouteSchema
>;
