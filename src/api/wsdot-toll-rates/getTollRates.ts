import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT = "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Retrieves all current toll rates from WSDOT API
 *
 * Returns current toll rates for all WSDOT toll facilities, including
 * pricing information and facility details.
 *
 * @returns Promise containing all toll rate data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tollRates = await getTollRates();
 * console.log(tollRates[0].CurrentToll); // 125
 * ```
 */
export const getTollRates = async (): Promise<TollRate[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollRatesParamsSchema,
    output: tollRateArraySchema,
  });
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTollRatesParamsSchema = z
  .object({})
  .describe("No parameters required.");

export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
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
        "Direction of travel for which the toll rate applies. Examples include 'S' (Southbound), 'N' (Northbound), 'E' (Eastbound), 'W' (Westbound), or 'Both Directions'. This field indicates which direction of travel is subject to the toll."
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

export const tollRateArraySchema = z
  .array(tollRateSchema)
  .describe(
    "Array of toll rate data for all active toll facilities across Washington State. This collection provides comprehensive pricing information that enables toll facility management, pricing transparency, and travel planning."
  );

export type TollRate = z.infer<typeof tollRateSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for retrieving all current toll rates from WSDOT API
 *
 * Returns current toll rates for all WSDOT toll facilities, including
 * pricing information and facility details.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with all toll rate data
 */
export const useTollRates = (
  options?: TanStackOptions<TollRate[]>
): UseQueryResult<TollRate[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollRates"],
    queryFn: () => getTollRates(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
