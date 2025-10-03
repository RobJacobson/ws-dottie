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
    /** ID of a specific Travel Time Route to retrieve. */
    TravelTimeID: z
      .number()
      .describe("ID of a specific Travel Time Route to retrieve."),
  })
  .describe(
    "Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas."
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
    "Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas."
  );

export type GetTravelTimesInput = z.infer<typeof getTravelTimesSchema>;
