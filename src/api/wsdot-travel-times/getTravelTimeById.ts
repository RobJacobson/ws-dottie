import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zLatitude, zLongitude, zWsdotDate } from "@/shared/validation";

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
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route
 * @returns Promise containing the specific travel time data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTime = await getTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime.CurrentTime); // 30
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
        "Unique identifier for the specific travel time route to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getTravelTimes endpoint or other travel time listings."
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
        "Average travel time for the route in minutes under normal traffic conditions. This field represents the typical travel time that drivers can expect when traffic is flowing normally, providing a baseline for comparison with current conditions."
      ),

    CurrentTime: z
      .number()
      .describe(
        "Current travel time for the route in minutes based on real-time traffic conditions. This field shows the actual travel time that drivers can expect right now, which may be higher or lower than the average time depending on current traffic congestion."
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
        "Distance of the travel time route in miles. This field shows the total length of the monitored route segment, providing context for understanding the travel time data and calculating average speeds."
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
        "Human-readable name for the travel time route that provides quick identification. Examples include 'I-5 Seattle to Tacoma', 'SR 520 from Bellevue to Seattle', or 'I-90 from Seattle to Issaquah'. This field is the primary display name used in applications."
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
        "Unique identifier assigned to this travel time route by the WSDOT system. This ID serves as a permanent, unique reference for the route across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete travel time route information including current and average travel times, route details, and endpoint information. This schema represents comprehensive travel time data from the WSDOT Travel Times API, providing essential information for route planning, congestion monitoring, and travel time estimation. The travel time details are critical for real-time navigation, traffic management, and transportation planning systems."
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
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with specific travel time data
 *
 * @example
 * ```typescript
 * const { data: travelTime } = useTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime?.CurrentTime); // 30
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
