import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTravelTimeById
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";

/**
 * Get specific travel time by ID from WSDOT Travel Times API
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID, including current and average travel times,
 * route distance, start/end points, and geographic coordinates.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route (e.g., 2 for Everett-Seattle HOV, 5 for Bellevue-Issaquah)
 * @returns Promise containing the specific travel time data with real-time conditions
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTime = await getTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime.CurrentTime); // 40 (current time in minutes)
 * console.log(travelTime.AverageTime); // 31 (historical average)
 * console.log(travelTime.Distance); // 26.72 (route distance in miles)
 * console.log(travelTime.Name); // "Everett-Seattle HOV"
 * ```
 */
export const getTravelTimeById = async (
  params: GetTravelTimeByIdParams
): Promise<TravelTimeRoute> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTravelTimeByIdParamsSchema,
      output: travelTimeRouteSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTravelTimeByIdParamsSchema
// GetTravelTimeByIdParams
// ============================================================================

export const getTravelTimeByIdParamsSchema = z
  .object({
    travelTimeId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific travel time route to retrieve. This ID corresponds to specific routes like 2 (Everett to Downtown Seattle using HOV lanes), 5 (Downtown Bellevue to Issaquah), 9 (Downtown Bellevue to Everett), or 17 (Federal Way to Downtown Seattle). The ID is assigned by the WSDOT system and can be obtained from the getTravelTimes endpoint response."
      ),
  })
  .describe(
    "Parameters for retrieving a specific travel time route by its unique identifier"
  );

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// travelTimeRouteSchema
// TravelTimeRoute
// ============================================================================

export const travelTimeEndpointSchema = z
  .object({
    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the travel time endpoint location. Examples include 'Northbound lanes', 'Bridge approach', 'Tunnel entrance', 'Interchange with SR 520', or 'Mountain pass overlook'. This field provides context about where the endpoint is positioned."
      ),

    Direction: z
      .string()
      .nullable()
      .describe(
        "Direction of travel indicator for the travel time endpoint. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', 'All Lanes', or 'Eastbound and Westbound'. This field indicates which direction of travel the endpoint represents."
      ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the travel time endpoint location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the endpoint. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the travel time endpoint location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the endpoint. Essential for GPS navigation and geographic information systems."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the travel time endpoint is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .nullable()
      .describe(
        "Name of the highway or road where the travel time endpoint is located. Examples include 'I-5', 'SR 520', 'US-2', 'I-90', or 'SR 9'. This field helps users identify which roadway the endpoint represents."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Geographic and descriptive information about a travel time endpoint location where travel time monitoring begins or ends. Contains coordinates, road information, and descriptive details that help identify and locate the specific endpoint point."
  );

export const travelTimeRouteSchema = z
  .object({
    AverageTime: z
      .number()
      .describe(
        "Average travel time for the route in minutes under normal traffic conditions. This field represents the historical average travel time that drivers can expect when traffic is flowing normally, providing a baseline for comparison with current conditions. Examples include 31 minutes for Everett to Seattle HOV (normally 28 minutes), 9 minutes for Bellevue to Issaquah, or 25 minutes for Federal Way to Seattle."
      ),

    CurrentTime: z
      .number()
      .describe(
        "Current travel time for the route in minutes based on real-time traffic conditions. This field shows the actual travel time that drivers can expect right now, which may be higher or lower than the average time depending on current traffic congestion. Examples include 40 minutes during rush hour (when average is 31 minutes), 10 minutes for a clear route, or -1 when data is unavailable. A value significantly higher than average indicates traffic delays."
      ),

    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the travel time route. Examples include 'I-5 from Seattle to Tacoma', 'SR 520 from Bellevue to Seattle', or 'I-90 from Seattle to Issaquah'. This field provides context about what the route represents."
      ),

    Distance: z
      .number()
      .describe(
        "Distance of the travel time route in miles. This field shows the total length of the monitored route segment, providing context for understanding the travel time data and calculating average speeds. Examples include 26.72 miles for Everett to Seattle, 9.28 miles for Bellevue to Issaquah, 13.03 miles for SeaTac to Seattle, or 21.85 miles for Federal Way to Seattle."
      ),

    EndPoint: travelTimeEndpointSchema
      .nullable()
      .describe(
        "Destination endpoint information for the travel time route. This object contains the ending location coordinates and descriptive details for the route."
      ),

    Name: z
      .string()
      .nullable()
      .describe(
        "Human-readable name for the travel time route that provides quick identification. Examples include 'Everett-Seattle HOV' (Everett to Downtown Seattle using HOV lanes), 'Bellevue-Issaquah' (Downtown Bellevue to Issaquah), 'Seattle-SeaTac' (Downtown Seattle to SeaTac), 'Federal Way-Seattle' (Federal Way to Downtown Seattle), or 'Bellevue-Everett' (Downtown Bellevue to Everett). This field is the primary display name used in applications and often indicates the direction and type of route."
      ),
    StartPoint: travelTimeEndpointSchema
      .nullable()
      .describe(
        "Starting endpoint information for the travel time route. This object contains the beginning location coordinates and descriptive details for the route."
      ),

    TimeUpdated: zWsdotDate().describe(
      "Timestamp indicating when this travel time information was last updated in the WSDOT system. This field shows the currency of the travel time data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    TravelTimeID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this travel time route by the WSDOT system. This ID serves as a permanent, unique reference for the route across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes. Examples include ID 2 for Everett-Seattle HOV, ID 5 for Bellevue-Issaquah, ID 9 for Bellevue-Everett, or ID 17 for Federal Way-Seattle."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete travel time route information including current and average travel times, route details, and endpoint information. This schema represents comprehensive travel time data from the WSDOT Travel Times API, providing essential information for route planning, congestion monitoring, and travel time estimation. Each route includes start and end points with geographic coordinates, distances ranging from 8 to 27 miles, and real-time travel times compared to historical averages. The travel time details are critical for real-time navigation, traffic management, and transportation planning systems."
  );

export type TravelTimeEndpoint = z.infer<typeof travelTimeEndpointSchema>;
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTravelTimeById
// ============================================================================

/**
 * Hook for getting a specific travel time by ID from WSDOT Travel Times API
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID, including current and average travel times,
 * route distance, start/end points, and geographic coordinates.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route (e.g., 2 for Everett-Seattle HOV, 5 for Bellevue-Issaquah)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with specific travel time data for navigation and routing
 *
 * @example
 * ```typescript
 * const { data: travelTime } = useTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime?.CurrentTime); // 40 (current time in minutes)
 * console.log(travelTime?.AverageTime); // 31 (historical average)
 * console.log(travelTime?.Name); // "Everett-Seattle HOV" (route name)
 * console.log(travelTime?.Distance); // 26.72 (route distance in miles)
 * ```
 */
export const useTravelTimeById = (
  params: GetTravelTimeByIdParams,
  options?: TanStackOptions<TravelTimeRoute>
): UseQueryResult<TravelTimeRoute, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "travel-times",
      "getTravelTimeById",
      JSON.stringify(params),
    ],
    queryFn: () => getTravelTimeById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
