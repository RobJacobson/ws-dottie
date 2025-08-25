import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollRates
// ============================================================================

const ENDPOINT = "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson";

/**
 * Retrieves all current toll rates from WSDOT Toll Rates API
 *
 * Returns comprehensive real-time toll rate data for all active toll facilities in Washington State,
 * including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge,
 * SR 99 Tunnel, SR 509 Expressway, and Tacoma Narrows Bridge. The data includes current pricing
 * in cents, travel directions, route information, and geographic coordinates for navigation.
 *
 * @returns Promise containing all toll rate data with pricing that changes based on time of day and payment method
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tollRates = await getTollRates();
 * console.log(tollRates[0].CurrentToll); // 125 (for $1.25)
 * console.log(tollRates[0].StateRoute); // '099' (SR 99)
 * console.log(tollRates.find(rate => rate.StateRoute === '520')?.CurrentToll); // SR 520 toll rate
 * ```
 */
export const getTollRates = async (): Promise<TollRate[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollRatesParamsSchema,
    output: tollRateArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollRatesParamsSchema
// GetTollRatesParams
// ============================================================================

export const getTollRatesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all current toll rates. The API returns comprehensive pricing data for all active toll facilities in Washington State, including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 509 Expressway, SR 520 Bridge, SR 99 Tunnel, and Tacoma Narrows Bridge. Each facility includes real-time toll rates, payment method information, and travel direction details essential for route planning and transportation cost management."
  );

export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollRateSchema
// TollRate
// ============================================================================

export const tollRateSchema = z
  .object({
    CurrentMessage: zNullableString().describe(
      "Current system message or notification related to the toll facility. May be null if no message is currently active. Examples include 'System maintenance', 'Holiday rates in effect', or 'Electronic tolling only'."
    ),

    CurrentToll: z
      .number()
      .describe(
        "Current toll amount in cents for the facility. This field shows the active pricing for the toll route and changes based on time of day, day of week, and traffic conditions. Examples include 125 (for $1.25 on SR 99), 325 (for $3.25 on SR 99), 100 (for $1.00 on SR 167), 495 (for $4.95 on SR 520 eastbound), 295 (for $2.95 on SR 520 westbound), or 0 (for free travel during off-peak hours, weekends, or exempt periods). Good To Go! pass holders get the lowest rates, while Pay By Mail is $2 higher."
      ),

    EndLatitude: zLatitude().describe(
      "Latitude coordinate of the toll facility endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the toll facility terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndLocationName: z
      .string()
      .nullable()
      .describe(
        "Name of the location where the toll facility ends. Examples include 'NB S Portal' (SR 99 northbound), 'SB S Portal' (SR 99 southbound), 'NE 128th' (I-405 exit), 'Ellingson Rd' (SR 167 exit), 'EB 78th Ave' (SR 520 eastbound), or 'WB 78th Ave' (SR 520 westbound). This field helps users identify the destination point of the toll route for navigation and trip planning."
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
      .nullable()
      .describe(
        "Name of the location where the toll facility begins. Examples include 'SB S Portal' (SR 99 southbound), 'NB S Portal' (SR 99 northbound), 'SR 524' (I-405 entrance), 'S 23rd St' (SR 167 entrance), 'WB 78th Ave' (SR 520 westbound), or 'EB 78th Ave' (SR 520 eastbound). This field helps users identify the starting point of the toll route for navigation and trip planning."
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
      .nullable()
      .describe(
        "State route identifier for the toll facility. Examples include '099' (SR 99 Tunnel), '405' (I-405 Express Toll Lanes), '167' (SR 167 High Occupancy Toll lanes), '520' (SR 520 Bridge), or '509' (SR 509 Expressway). This field helps users identify which highway the toll facility operates on and matches the route numbering used on Washington State highways."
      ),

    TimeUpdated: zWsdotDate().describe(
      "Timestamp indicating when this toll rate information was last updated in the WSDOT system. This field shows the currency of the pricing data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel for which the toll rate applies. Examples include 'S' (Southbound on SR 99, SR 167, or I-405), 'N' (Northbound on SR 99, SR 167, or I-405), 'E' (Eastbound on SR 520), 'W' (Westbound on SR 520), or 'Both Directions' (for facilities that charge in both directions). This field indicates which direction of travel is subject to the toll and is crucial for understanding which way traffic is moving."
      ),

    TripName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '099tp03268' (SR 99 southbound), '405tp02896' (I-405 from SR 524 to Bellevue), '167tp02564' (SR 167 from S 23rd St to Ellingson Rd), '520tp00422' (SR 520 eastbound from WB 78th Ave to EB 78th Ave), or '520tp00421' (SR 520 westbound from EB 78th Ave to WB 78th Ave). The format is typically '[route]tp[identifier]' and serves as a reference for the specific toll route segment."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete toll rate information including pricing, location details, and facility information. This schema represents comprehensive toll data from the WSDOT Toll Rates API, providing essential information for toll facility management, pricing transparency, and travel planning. The data includes real-time toll rates for all Washington State toll facilities including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge, SR 99 Tunnel, and others. Each toll segment includes pricing in cents, travel direction, route information, and geographic coordinates for navigation and trip planning."
  );

export const tollRateArraySchema = z
  .array(tollRateSchema)
  .describe(
    "Array of toll rate data for all active toll facilities across Washington State. This comprehensive collection includes real-time pricing for I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge, SR 99 Tunnel, SR 509 Expressway, and Tacoma Narrows Bridge. The data provides essential information for transportation cost management, route planning, and travel budget calculations, with rates that change based on time of day, traffic conditions, and payment methods."
  );

export type TollRate = z.infer<typeof tollRateSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollRates
// ============================================================================

/**
 * Hook for retrieving all current toll rates from WSDOT Toll Rates API
 *
 * Returns comprehensive real-time toll rate data for all active toll facilities in Washington State,
 * including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge,
 * SR 99 Tunnel, SR 509 Expressway, and Tacoma Narrows Bridge. The data includes current pricing
 * in cents, travel directions, route information, and geographic coordinates for navigation.
 * Data is updated frequently to reflect changing toll rates based on time of day and traffic conditions.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with all toll rate data array for transportation cost management
 *
 * @example
 * ```typescript
 * const { data: tollRates } = useTollRates();
 * const sr520Toll = tollRates?.find(rate => rate.StateRoute === '520' && rate.TravelDirection === 'E');
 * console.log(sr520Toll?.CurrentToll); // Current eastbound SR 520 toll in cents
 * ```
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
