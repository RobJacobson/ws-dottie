import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zLatitude, zLongitude, zWsdotDate } from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Retrieves toll trip information with geometry data from WSDOT API
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all toll trip information data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tripInfo = await getTollTripInfo({});
 * console.log(tripInfo[0].TripName); // "405tp01351"
 * ```
 */
export const getTollTripInfo = async (params: GetTollTripInfoParams = {}) => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripInfoParamsSchema,
      output: tollTripInfoArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTollTripInfoParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting toll trip information. The API returns detailed trip information including geometry data for toll facilities and routes."
  );

export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const tollTripInfoSchema = z
  .object({
    EndLatitude: zLatitude().describe(
      "Latitude coordinate of the toll trip endpoint in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the trip terminus. Essential for GPS navigation and geographic information systems."
    ),

    EndLocationName: z
      .string()
      .describe(
        "Name of the location where the toll trip ends. Examples include 'Bellevue', 'Seattle', 'Tacoma', or 'Everett'. This field helps users identify the destination point of the toll trip."
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
      .describe(
        "Name of the location where the toll trip begins. Examples include 'Bellevue', 'Seattle', 'Tacoma', or 'Everett'. This field helps users identify the starting point of the toll trip."
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
      .describe(
        "Direction of travel for which the toll trip applies. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', or 'All Lanes'. This field indicates which direction of travel the trip information applies to."
      ),

    TripName: z
      .string()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '405tp01351', '520tp00123', or '167tp00456'. This field serves as a reference for the specific toll route and can be used for tracking and correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed toll trip information including location details, geometry data, and route information. This schema represents comprehensive trip data from the WSDOT Toll Rates API, providing essential information for toll route mapping, navigation applications, and facility management. The trip details are critical for spatial analysis, route visualization, and transportation planning."
  );

export const tollTripInfoArraySchema = z
  .array(tollTripInfoSchema)
  .describe(
    "Array of toll trip information data for all active toll routes across Washington State. This collection provides comprehensive route information that enables toll route mapping, navigation applications, and facility management."
  );

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for retrieving toll trip information with geometry data from WSDOT API
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with all toll trip information data
 */
export const useTollTripInfo = (
  params: GetTollTripInfoParams = {},
  options?: TanStackOptions<TollTripInfo[]>
): UseQueryResult<TollTripInfo[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo", params],
    queryFn: () => getTollTripInfo(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
