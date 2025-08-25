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
// getTollTripInfo
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson";

/**
 * Retrieves toll trip information with geometry data from WSDOT API
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @returns Promise containing all toll trip information data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tripInfo = await getTollTripInfo();
 * console.log(tripInfo[0].TripName); // "405tp01351"
 * ```
 */
export const getTollTripInfo = async (): Promise<TollTripInfo[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripInfoParamsSchema,
    output: tollTripInfoArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripInfoParamsSchema
// GetTollTripInfoParams
// ============================================================================

export const getTollTripInfoParamsSchema = z
  .object({})
  .describe("No parameters required for getting toll trip information with geometry. The API returns comprehensive route data for all active toll facilities in Washington State, including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge, SR 99 Tunnel, and others. Each trip includes geometry data for mapping applications and spatial analysis.");

export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollTripInfoSchema
// TollTripInfo
// ============================================================================

export const tollTripInfoSchema = z
  .object({
    EndLatitude: zLatitude().describe(
      "Latitude coordinate of the toll trip endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndLocationName: z
      .string()
      .nullable()
      .describe(
        "Name of the location where the toll trip ends. Examples include 'NB S Portal' (SR 99 northbound), 'SB S Portal' (SR 99 southbound), 'NE 128th' (I-405 exit), 'Ellingson Rd' (SR 167 exit), 'EB 78th Ave' (SR 520 eastbound), or 'WB 78th Ave' (SR 520 westbound). This field helps users identify the destination point of the toll trip for navigation and trip planning."
      ),

    EndLongitude: zLongitude().describe(
      "Longitude coordinate of the toll trip endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndMilepost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the toll trip ends. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    Geometry: z
      .string()
      .describe(
        "Geometric representation of the toll trip route, typically in Well-Known Text (WKT) format or similar coordinate string format. This field provides the spatial path of the toll route for mapping and visualization applications."
      ),

    ModifiedDate: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp indicating when this trip information was last modified in the WSDOT system. May be null if no modification date is available. This field shows when the route or facility information was last updated. All times are in Pacific Time Zone."
      ),

    StartLatitude: zLatitude().describe(
      "Latitude coordinate of the toll trip starting point in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip origin. Essential for GPS navigation and geographic information systems."
    ),

    StartLocationName: z
      .string()
      .nullable()
      .describe(
        "Name of the location where the toll trip begins. Examples include 'SB S Portal' (SR 99 southbound), 'NB S Portal' (SR 99 northbound), 'SR 524' (I-405 entrance), 'S 23rd St' (SR 167 entrance), 'WB 78th Ave' (SR 520 westbound), or 'EB 78th Ave' (SR 520 eastbound). This field helps users identify the starting point of the toll trip for navigation and trip planning."
      ),

    StartLongitude: zLongitude().describe(
      "Longitude coordinate of the toll trip starting point in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip origin. Essential for GPS navigation and geographic information systems."
    ),

    StartMilepost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway where the toll trip begins. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel for which the toll trip applies. Examples include 'S' (Southbound on SR 99, SR 167, or I-405), 'N' (Northbound on SR 99, SR 167, or I-405), 'E' (Eastbound on SR 520), 'W' (Westbound on SR 520), or 'Both Directions' (for facilities that charge in both directions). This field indicates which direction of travel the trip information applies to and is crucial for understanding which way traffic is moving."
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
    "Detailed toll trip information including location details, geometry data, and route information. This schema represents comprehensive trip data from the WSDOT Toll Rates API, providing essential information for toll route mapping, navigation applications, and facility management. The data includes geographic coordinates, route segments, and spatial geometry for all toll facilities including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge, SR 99 Tunnel, and others. The trip details are critical for spatial analysis, route visualization, and transportation planning."
  );

export const tollTripInfoArraySchema = z
  .array(tollTripInfoSchema)
  .describe(
    "Array of toll trip information data for all active toll routes across Washington State. This collection provides comprehensive route information that enables toll route mapping, navigation applications, and facility management."
  );

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripInfo
// ============================================================================

/**
 * Hook for retrieving toll trip information with geometry data from WSDOT API
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with all toll trip information data
 */
export const useTollTripInfo = (
  options?: TanStackOptions<TollTripInfo[]>
): UseQueryResult<TollTripInfo[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo"],
    queryFn: () => getTollTripInfo(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
