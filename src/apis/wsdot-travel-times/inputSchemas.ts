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
 * Used for retrieving travel time data for a specific route by TravelTimeID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTravelTimeInputSchema = z.object({
  TravelTimeID: z
    .number()
    .describe("ID of a specific Travel Time Route to retrieve."),
});

export type GetTravelTimeInput = z.infer<typeof GetTravelTimeInputSchema>;

/**
 * Schema for GetTravelTimes input parameters
 *
 * Used for retrieving all travel time data. Only requires AccessCode,
 * which is handled separately and not included in input schemas.
 */
export const GetTravelTimesInputSchema = z.object({});

export type GetTravelTimesInput = z.infer<typeof GetTravelTimesInputSchema>;
