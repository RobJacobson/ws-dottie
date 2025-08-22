import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zLatitude, zLongitude } from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Get weather stations from WSDOT Weather Stations API
 *
 * Retrieves information about all weather stations maintained by WSDOT.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing weather stations data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const stations = await getWeatherStations({});
 * console.log(stations[0].StationName); // "Snoqualmie Pass"
 * ```
 */
export const getWeatherStations = async (
  params: GetWeatherStationsParams = {}
): Promise<WeatherStationData[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherStationsParamsSchema,
      output: weatherStationDataArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getWeatherStationsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting weather stations information. The API returns information about all weather stations maintained by WSDOT across Washington State."
  );

export type GetWeatherStationsParams = z.infer<
  typeof getWeatherStationsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const weatherStationDataSchema = z
  .object({
    Latitude: z
      .number()
      .optional()
      .describe(
        "Latitude coordinate of the weather station location in decimal degrees. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
      ),

    Longitude: z
      .number()
      .optional()
      .describe(
        "Longitude coordinate of the weather station location in decimal degrees. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
      ),

    StationCode: z
      .number()
      .int()
      .optional()
      .describe(
        "Unique numeric identifier assigned to this weather station by the WSDOT system. This code serves as a permanent, unique reference for the station across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    StationName: z
      .string()
      .nullable()
      .optional()
      .describe(
        "Human-readable name for the weather station that provides quick identification. Examples include 'Snoqualmie Pass', 'Stevens Pass', 'White Pass', 'Crystal Mountain', 'Mount Baker', or 'Alpental'. This field is the primary display name used in applications."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete weather station information including location coordinates, station code, and station name. This schema represents comprehensive station data from the WSDOT Weather Stations API, providing essential information for weather station identification, mapping, and management. The station details are critical for weather monitoring systems, geographic information systems, and transportation safety applications across Washington State."
  );

export const weatherStationDataArraySchema = z
  .array(weatherStationDataSchema)
  .describe(
    "Array of weather station data for all active weather stations maintained by WSDOT across Washington State. This collection provides comprehensive station information that enables weather station identification, mapping, and management."
  );

export type WeatherStationData = z.infer<typeof weatherStationDataSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting weather stations from WSDOT Weather Stations API
 *
 * Retrieves information about all weather stations maintained by WSDOT.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with weather stations data
 *
 * @example
 * ```typescript
 * const { data: stations } = useWeatherStations({});
 * console.log(stations?.[0]?.StationName); // "Snoqualmie Pass"
 * ```
 */
export const useWeatherStations = (
  params: GetWeatherStationsParams = {},
  options?: TanStackOptions<WeatherStationData[]>
): UseQueryResult<WeatherStationData[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "weather-stations", "getWeatherStations", params],
    queryFn: () => getWeatherStations(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
