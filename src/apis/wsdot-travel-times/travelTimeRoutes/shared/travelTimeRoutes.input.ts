/**
 * @fileoverview WSDOT Travel Times API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSDOT
 * Travel Times API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for GetTravelTimeById input parameters
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const travelTimeByIdInputSchema = z
  .object({
    TravelTimeID: z.number().describe("Numeric ID of the travel time route."),
  })
  .describe(
    "Input parameters for retrieving travel time data for a specific route by ID."
  );

export type TravelTimeByIdInput = z.infer<typeof travelTimeByIdInputSchema>;

/**
 * Schema for GetTravelTimes input parameters
 *
 * Provides current travel times for many popular travel routes around Washington State. Coverage Area: Seattle, Tacoma, and Snoqualmie Pass areas.
 */
export const travelTimesInputSchema = z
  .object({})
  .describe("Input parameters for retrieving travel time data for all routes.");

export type TravelTimesInput = z.infer<typeof travelTimesInputSchema>;
