import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/validation";

// ============================================================================
// API Function
//
// getWeatherInformationExtended
// ============================================================================

const ENDPOINT = "/traffic/api/api/Scanweb";

/**
 * Get extended weather information from WSDOT Weather Information Extended API
 *
 * Retrieves additional weather readings including surface and subsurface
 * measurements from WSDOT weather stations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing extended weather readings data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherReadings = await getWeatherInformationExtended({});
 * console.log(weatherReadings[0].AirTemperature); // 15.5
 * ```
 *
 * @note ENDPOINT DISCREPANCY: Official WSDOT documentation shows endpoint as
 * `/api/Scanweb`, but the actual working endpoint is `/traffic/api/api/Scanweb`.
 * The documented endpoint returns HTML (not functional), while the current
 * endpoint works correctly and returns the expected JSON data. This appears
 * to be a documentation issue rather than an implementation issue.
 */
export const getWeatherInformationExtended = async (
  params: GetWeatherInformationExtendedParams = {}
): Promise<WeatherReading[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherInformationExtendedParamsSchema,
      output: weatherReadingArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationExtendedParamsSchema
// GetWeatherInformationExtendedParams
// ============================================================================

export const getWeatherInformationExtendedParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting extended weather information. The API returns additional weather readings including surface and subsurface measurements from WSDOT weather stations across Washington State."
  );

export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherReadingSchema
// WeatherReading
// ============================================================================

export const surfaceMeasurementSchema = z
  .object({
    SensorId: z
      .number()
      .describe(
        "Unique identifier for the surface measurement sensor at the weather station. This ID serves as a reference for the specific sensor that provides surface condition data."
      ),

    SurfaceTemperature: zNullableNumber().describe(
      "Current surface temperature reading from the sensor in degrees Celsius. This field shows the temperature of the road surface, which is critical for determining road conditions, frost formation, and winter weather alerts. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    RoadFreezingTemperature: zNullableNumber().describe(
      "Road freezing temperature reading from the sensor in degrees Celsius. This field indicates the temperature at which the road surface will freeze, which is essential for winter weather warnings and road safety alerts. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    RoadSurfaceCondition: zNullableNumber().describe(
      "Road surface condition reading from the sensor, typically represented as a numeric code. This field provides information about the current state of the road surface, such as dry, wet, icy, or snowy conditions. May be null if the sensor is not functioning or the reading is unavailable."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Surface measurement data including road surface temperature, freezing temperature, and surface condition information. This schema represents critical road condition data that is essential for winter weather monitoring and transportation safety."
  );

export const subSurfaceMeasurementSchema = z
  .object({
    SensorId: z
      .number()
      .describe(
        "Unique identifier for the subsurface measurement sensor at the weather station. This ID serves as a reference for the specific sensor that provides subsurface condition data."
      ),

    SubSurfaceTemperature: zNullableNumber().describe(
      "Current subsurface temperature reading from the sensor in degrees Celsius. This field shows the temperature below the road surface, which is important for understanding ground freezing conditions and predicting road surface changes. May be null if the sensor is not functioning or the reading is unavailable."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Subsurface measurement data including temperature readings below the road surface. This schema represents important ground condition data that helps predict road surface changes and freezing conditions."
  );

export const weatherReadingSchema = z
  .object({
    StationId: z
      .string()
      .describe(
        "Unique identifier for the weather station in string format. This ID serves as a permanent, unique reference for the station across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    StationName: z
      .string()
      .describe(
        "Human-readable name for the weather station that provides quick identification. Examples include 'Alpental', 'Stevens Pass', 'White Pass', 'Crystal Mountain', or 'Mount Baker'. This field is the primary display name used in applications."
      ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the weather station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the weather station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
    ),

    Elevation: z
      .number()
      .describe(
        "Elevation of the weather station above sea level in feet. This field provides important context about the station's location and helps users understand the environmental conditions at different altitudes."
      ),

    ReadingTime: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp indicating when this weather reading was taken by the WSDOT system. This field shows the currency of the weather data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone. Format: ISO 8601 string (e.g., '2025-08-22T03:08:33'). May be null if the timestamp is not available."
      ),

    AirTemperature: zNullableNumber().describe(
      "Current air temperature reading from the weather station in degrees Celsius. This field shows the actual temperature at the station location, which is critical for road condition monitoring, winter weather alerts, and general weather information. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    RelativeHumidty: zNullableNumber().describe(
      "Relative humidity reading from the weather station as a percentage (0-100). This field indicates the amount of water vapor present in the air relative to the maximum amount possible at the current temperature. Note: API contains typo 'RelativeHumidty' instead of 'RelativeHumidity'. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    AverageWindSpeed: zNullableNumber().describe(
      "Average wind speed reading from the weather station in miles per hour. This field shows the sustained wind speed over a longer time period, which is used for general weather conditions and wind advisories. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    AverageWindDirection: zNullableNumber().describe(
      "Average wind direction reading from the weather station in degrees (0-359). This field shows the direction from which the wind is blowing, where 0° is North, 90° is East, 180° is South, and 270° is West. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    WindGust: zNullableNumber().describe(
      "Current wind gust speed reading from the weather station in miles per hour. This field shows the highest wind speed recorded during a short time period, which is important for high wind warnings and transportation safety. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    Visibility: zNullableNumber().describe(
      "Current visibility reading from the weather station in meters. This field indicates how far ahead drivers can see clearly, which is crucial for road safety during fog, rain, snow, or other low-visibility conditions. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationIntensity: zNullableNumber().describe(
      "Current precipitation intensity reading from the weather station, typically measured in millimeters per hour. This field shows how hard it is currently raining or snowing, which is important for road safety and weather alerts. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationType: zNullableNumber().describe(
      "Type of precipitation currently occurring at the weather station, typically represented as a numeric code. This field indicates whether the station is experiencing rain, snow, sleet, or other forms of precipitation. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationPast1Hour: zNullableNumber().describe(
      "Total precipitation amount measured at the weather station over the past 1 hour in millimeters. This field shows recent precipitation activity and helps users understand current weather conditions. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationPast3Hours: zNullableNumber().describe(
      "Total precipitation amount measured at the weather station over the past 3 hours in millimeters. This field shows short-term precipitation patterns and helps users understand recent weather activity. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationPast6Hours: zNullableNumber().describe(
      "Total precipitation amount measured at the weather station over the past 6 hours in millimeters. This field shows medium-term precipitation patterns and helps users understand weather trends. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationPast12Hours: zNullableNumber().describe(
      "Total precipitation amount measured at the weather station over the past 12 hours in millimeters. This field shows longer-term precipitation patterns and helps users understand weather trends over half-day periods. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationPast24Hours: zNullableNumber().describe(
      "Total precipitation amount measured at the weather station over the past 24 hours in millimeters. This field shows daily precipitation totals and helps users understand weather patterns over full-day periods. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    PrecipitationAccumulation: zNullableNumber().describe(
      "Total precipitation accumulation at the weather station, typically measured in millimeters. This field shows the cumulative precipitation over a longer period and helps users understand overall precipitation patterns. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    BarometricPressure: zNullableNumber().describe(
      "Atmospheric pressure reading from the weather station in hectopascals (hPa). This field indicates the current barometric pressure which is important for weather forecasting and aviation. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    SnowDepth: zNullableNumber().describe(
      "Current snow depth reading from the weather station in centimeters. This field shows the total depth of snow on the ground, which is critical for winter weather monitoring, road condition assessment, and avalanche warnings. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    SurfaceMeasurements: z
      .array(surfaceMeasurementSchema)
      .nullable()
      .describe(
        "Array of surface measurement data from various sensors at the weather station. This collection provides detailed road surface condition information including temperature, freezing temperature, and surface condition data. May be null if no surface measurements are available."
      ),

    SubSurfaceMeasurements: z
      .array(subSurfaceMeasurementSchema)
      .nullable()
      .describe(
        "Array of subsurface measurement data from various sensors at the weather station. This collection provides detailed ground condition information including subsurface temperature data. May be null if no subsurface measurements are available."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete extended weather information including comprehensive environmental readings, precipitation data, and surface/subsurface measurements from a WSDOT weather station. This schema represents detailed weather data from the WSDOT Weather Information Extended API, providing essential information for road condition monitoring, winter weather alerts, precipitation tracking, and transportation safety. The extended weather details are critical for comprehensive weather monitoring, road safety management, and environmental condition assessment across Washington State."
  );

export const weatherReadingArraySchema = z
  .array(weatherReadingSchema)
  .describe(
    "Array of extended weather reading data for all active weather stations across Washington State. This collection provides comprehensive weather information that enables detailed road condition monitoring, winter weather alerts, precipitation tracking, and transportation safety management."
  );

export type SurfaceMeasurement = z.infer<typeof surfaceMeasurementSchema>;
export type SubSurfaceMeasurement = z.infer<typeof subSurfaceMeasurementSchema>;
export type WeatherReading = z.infer<typeof weatherReadingSchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationExtended
// ============================================================================

/**
 * React Query hook for retrieving extended weather information
 *
 * Retrieves additional weather readings including surface and subsurface
 * measurements from WSDOT weather stations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing extended weather information data
 *
 * @example
 * ```typescript
 * const { data: weatherReadings } = useWeatherInformationExtended({});
 * console.log(weatherReadings[0].AirTemperature); // 15.5
 * ```
 */
export const useWeatherInformationExtended = (
  params: GetWeatherInformationExtendedParams = {},
  options?: TanStackOptions<WeatherReading[]>
): UseQueryResult<WeatherReading[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information-extended",
      "getWeatherInformationExtended",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformationExtended(params),
    ...tanstackQueryOptions.HOURLY_UPDATES,
    ...options,
  });
};
