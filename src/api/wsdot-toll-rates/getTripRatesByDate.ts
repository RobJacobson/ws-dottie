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

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Retrieves historical toll rates by date range from WSDOT API
 *
 * Returns historical toll rate data for a specified date range,
 * enabling analysis of toll rate trends over time.
 *
 * @param params - Date range parameters for historical data retrieval
 * @returns Promise containing historical toll rate data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const historicalRates = await getTripRatesByDate({
 *   fromDate: "2024-01-01",
 *   toDate: "2024-01-31"
 * });
 * console.log(historicalRates[0].CurrentToll); // Historical toll amount
 * ```
 */
export const getTripRatesByDate = async (
  params: GetTripRatesByDateParams
): Promise<TollRate[]> => {
  return zodFetch(ENDPOINT, {
    input: getTripRatesByDateParamsSchema,
    output: tollRateArraySchema,
    params,
  });
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTripRatesByDateParamsSchema = z
  .object({
    fromDate: z
      .string()
      .describe(
        "Start date for historical data retrieval in YYYY-MM-DD format. This field specifies the beginning of the date range for historical toll rate analysis."
      ),

    toDate: z
      .string()
      .describe(
        "End date for historical data retrieval in YYYY-MM-DD format. This field specifies the end of the date range for historical toll rate analysis."
      ),
  })
  .describe(
    "Date range parameters for retrieving historical toll rate data. Both dates must be in YYYY-MM-DD format and represent a valid date range for historical analysis."
  );

export type GetTripRatesByDateParams = z.infer<
  typeof getTripRatesByDateParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Reuse the existing toll rate schemas for consistency
export const tripRateTollRateSchema = z
  .object({
    CurrentMessage: zNullableString().describe(
      "Current system message or notification related to the toll facility. May be null if no message is currently active. Examples include 'System maintenance', 'Holiday rates in effect', or 'Electronic tolling only'."
    ),

    CurrentToll: z
      .number()
      .describe(
        "Historical toll amount in cents for the facility during the specified date range. This field shows the pricing that was active for the toll route during the historical period. Examples include 125 (for $1.25), 250 (for $2.50), or 0 (for free travel)."
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
      "Timestamp indicating when this historical toll rate information was recorded in the WSDOT system. This field shows when the historical pricing data was captured and helps users understand the temporal context of the data. All times are in Pacific Time Zone."
    ),

    TravelDirection: z
      .string()
      .describe(
        "Direction of travel for which the historical toll rate applies. Examples include 'S' (Southbound), 'N' (Northbound), 'E' (Eastbound), 'W' (Westbound), or 'Both Directions'. This field indicates which direction of travel the historical toll rate applied to."
      ),

    TripName: z
      .string()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '405tp01351', '520tp00123', or '167tp00456'. This field serves as a reference for the specific toll route and can be used for tracking and correlation purposes across historical data."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Historical toll rate information including pricing, location details, and facility information for a specific date range. This schema represents historical toll data from the WSDOT Toll Rates API, providing essential information for toll rate trend analysis, historical pricing research, and transportation cost analysis over time."
  );

export const tripRateTollRateArraySchema = z
  .array(tripRateTollRateSchema)
  .describe(
    "Array of historical toll rate data for toll facilities across Washington State during the specified date range. This collection provides comprehensive historical pricing information that enables toll rate trend analysis, historical research, and transportation cost analysis over time."
  );

export type TripRateTollRate = z.infer<typeof tripRateTollRateSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for retrieving historical toll rates by date range from WSDOT API
 *
 * Returns historical toll rate data for a specified date range,
 * enabling analysis of toll rate trends over time.
 *
 * @param params - Date range parameters for historical data retrieval
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with historical toll rate data
 */
export const useTripRatesByDate = (
  params: GetTripRatesByDateParams,
  options?: TanStackOptions<TollRate[]>
): UseQueryResult<TollRate[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTripRatesByDate", params],
    queryFn: () => getTripRatesByDate(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
