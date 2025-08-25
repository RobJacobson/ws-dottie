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
// getBorderCrossings
// ============================================================================

const ENDPOINT =
  "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson";

/**
 * Get border crossing wait times from WSDOT Border Crossings API
 *
 * Returns estimated wait times for all border crossings between Washington State and Canada.
 * Data includes location information, crossing names, timestamps, and current wait times.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to array of border crossing data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const crossings = await getBorderCrossings({});
 * console.log(crossings[0].CrossingName); // "Peace Arch"
 * ```
 */
export const getBorderCrossings = async (
  params: GetBorderCrossingsParams = {}
): Promise<BorderCrossingData[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getBorderCrossingsParamsSchema,
      output: borderCrossingDataArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getBorderCrossingsParamsSchema
// GetBorderCrossingsParams
// ============================================================================

export const getBorderCrossingsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for retrieving border crossing wait time data. This endpoint provides current wait times for all monitored U.S.-Canada border crossings between Washington State and British Columbia, enabling travelers to make informed decisions about border crossing timing and route selection."
  );

export type GetBorderCrossingsParams = z.infer<
  typeof getBorderCrossingsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// borderCrossingDataSchema
// BorderCrossingData
// ============================================================================

export const borderCrossingLocationSchema = z
  .object({
    Description: z
      .string()
      .describe(
        "Human-readable description of the border crossing location and facility type. Identifies the specific lane or facility being monitored, such as 'I-5 General Purpose' for standard I-5 lanes, 'SR 543 Nexus Lane' for NEXUS expedited processing, or 'SR 543 Trucks' for commercial vehicle lanes. This field helps users identify which specific facility the wait time data applies to."
      ),

    Direction: zNullableString().describe(
      "Direction of travel for the border crossing, indicating whether it's for northbound (entering Canada) or southbound (entering US) traffic."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the border crossing location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning. Border crossings are typically located along the 49th parallel between Washington State and British Columbia."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the border crossing location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning. Border crossings are typically located between approximately -123.0 and -122.0 degrees West in the Washington-British Columbia region."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway or road where the border crossing is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .describe(
        "Name of the highway or road where the border crossing is located, using the numeric route identifier. Examples include '005' for I-5, '539' for SR 539, '543' for SR 543, and '009' for SR 9. These numeric identifiers correspond to the Washington State highway system designations and help users understand which roadway leads to the border crossing."
      ),
  })
  .catchall(z.unknown())
  .nullable()
  .describe(
    "Geographic and descriptive information about a border crossing location. Contains coordinates, road information, and descriptive details that help identify and locate the specific border crossing point. When present, includes facility type descriptions like 'I-5 General Purpose', 'SR 543 Nexus Lane', or 'SR 543 Trucks' to identify the specific lane or facility being monitored."
  );

export const borderCrossingDataSchema = z
  .object({
    BorderCrossingLocation: borderCrossingLocationSchema
      .nullable()
      .describe(
        "Detailed location information for the border crossing including coordinates, road details, and descriptive text. This object provides comprehensive geographic context for the crossing location."
      ),

    CrossingName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier for the border crossing lane or facility type. Combines the route identifier with facility type, such as 'I5' for I-5 general purpose lanes, 'I5Nexus' for I-5 NEXUS lanes, 'SR543Trucks' for SR 543 commercial vehicle lanes, or 'SR543TrucksFast' for SR 543 FAST lanes. This identifier is used internally by the WSDOT system and may not always match the commonly known crossing names."
      ),

    Time: zWsdotDate().describe(
      "Timestamp indicating when the wait time data was last updated by the WSDOT border monitoring system. This field shows how current the wait time information is, helping users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    WaitTime: z
      .number()
      .describe(
        "Current estimated wait time in minutes for vehicles crossing the border at this specific lane or facility. This is the primary data point that travelers use to plan their border crossing timing. Values of -1 indicate that wait time data is not available or the facility is not currently monitored. Positive values represent actual wait times observed at the crossing, which can vary significantly based on time of day, day of week, seasonal traffic patterns, and current border processing conditions."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete border crossing information for a specific lane or facility at a U.S.-Canada border crossing. Each object represents one monitored facility (such as general purpose lanes, NEXUS lanes, or commercial vehicle lanes) and includes real-time wait time data, location coordinates when available, and update timestamp. This schema represents the core data structure returned by the WSDOT Border Crossings API, enabling travelers to make informed decisions about border crossing timing and facility selection based on current wait conditions."
  );

export const borderCrossingDataArraySchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Array of border crossing data for all monitored U.S.-Canada border crossings between Washington State and British Columbia. Each entry represents a specific border crossing lane or facility type, providing real-time wait times and location information to help travelers make informed decisions about when and where to cross the border. The array typically includes 10-15 entries covering major crossings like Peace Arch (I-5), Pacific Highway (SR 543), Lynden (SR 539), and Sumas (SR 9)."
  );

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;
export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useBorderCrossings
// ============================================================================

/**
 * Hook for getting border crossing wait times from WSDOT Border Crossings API
 *
 * Returns estimated wait times for all border crossings between Washington State and Canada.
 * Uses frequent update options since border crossing data changes frequently.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with border crossing data
 *
 * @example
 * ```typescript
 * const { data: crossings } = useBorderCrossings({});
 * console.log(crossings?.[0]?.CrossingName); // "Peace Arch"
 * ```
 */
export const useBorderCrossings = (
  params: GetBorderCrossingsParams = {},
  options?: TanStackOptions<BorderCrossingData[]>
): UseQueryResult<BorderCrossingData[], Error> => {
  return useQuery({
    queryKey: ["api", "wsdot", "border-crossings", JSON.stringify(params)],
    queryFn: () => getBorderCrossings(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
