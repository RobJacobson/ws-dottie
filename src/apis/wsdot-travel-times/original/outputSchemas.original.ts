/**
 * @fileoverview WSDOT Travel Times API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Travel Times API, which provides current travel times for covered routes
 * in Seattle, Tacoma, and Snoqualmie Pass areas.
 */

import { z } from "zod";

import { roadwayLocationSchema, zWsdotDate } from "@/apis/shared";

/**
 * Schema for TravelTimeRoute - represents a travel time route
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const travelTimeRouteSchema = z
  .object({
    /**
     * The average time in minutes that it takes to complete this route.
     */
    AverageTime: z
      .number()
      .describe(
        "The average time in minutes that it takes to complete this route."
      ),
    /**
     * The current estimated time in minutes that it takes to complete this route.
     */
    CurrentTime: z
      .number()
      .describe(
        "The current estimated time in minutes that it takes to complete this route."
      ),
    /** A description for the route. */
    Description: z.string().nullable().describe("A description for the route."),
    /** Total distance of this route in miles. */
    Distance: z.number().describe("Total distance of this route in miles."),
    /** The location where this route ends. */
    EndPoint: roadwayLocationSchema
      .nullable()
      .describe("The location where this route ends."),
    /** A friendly name for the route. */
    Name: z.string().nullable().describe("A friendly name for the route."),
    /** The location where this route begins. */
    StartPoint: roadwayLocationSchema
      .nullable()
      .describe("The location where this route begins."),
    /** The last time that the data for this route was updated. */
    TimeUpdated: zWsdotDate().describe(
      "The last time that the data for this route was updated."
    ),
    /** Unique ID that is specific to a route. */
    TravelTimeID: z.number().describe("Unique ID that is specific to a route."),
  })
  .describe("Schema for TravelTimeRoute - represents a travel time route");

/**
 * Schema for TravelTimeRoutesList - the main response list for GetTravelTimes
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const travelTimeRoutesListSchema = z
  .array(travelTimeRouteSchema)
  .describe(
    "Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas."
  );

// Export types
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;
export type TravelTimeRoutesList = z.infer<typeof travelTimeRoutesListSchema>;
