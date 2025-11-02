/**
 * @fileoverview WSDOT Travel Times API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSDOT
 * Travel Times API endpoints.
 */

import { z } from "zod";

/**
 * Schema for GetTravelTime input parameters
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const getTravelTimeSchema = z
  .object({
    TravelTimeID: z
      .number()
      .describe(
        "Unique travel time route identifier, as an integer ID. E.g., '1' for Everett-Seattle route, '2' for Everett-Seattle HOV route, '5' for Bellevue-Issaquah route. Used to retrieve specific route travel time data."
      ),
  })
  .describe(
    "Retrieves current travel time data for specific route by ID, returning current and average travel times, route distance, start/end points, and update timestamp. Coverage includes Seattle, Tacoma, and Snoqualmie Pass areas. Use for individual route travel time lookups."
  );

export type GetTravelTimeInput = z.infer<typeof getTravelTimeSchema>;

/**
 * Schema for GetTravelTimes input parameters
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const getTravelTimesSchema = z
  .object({})
  .describe(
    "Retrieves current travel time data for all routes, returning current and average travel times, route distances, start/end points, and update timestamps. Coverage includes Seattle, Tacoma, and Snoqualmie Pass areas. Use for route planning and travel time monitoring."
  );

export type GetTravelTimesInput = z.infer<typeof getTravelTimesSchema>;
