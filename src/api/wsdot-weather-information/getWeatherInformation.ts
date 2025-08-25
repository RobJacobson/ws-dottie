import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getWeatherInformation
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson";

/**
 * Get all weather information from WSDOT Weather Information API
 *
 * Retrieves current weather data for all monitored weather stations across Washington State.
 * This data is collected through the Washington State Department of Transportation's
 * weather monitoring program, which maintains a network of weather stations at strategic
 * highway locations. The data includes temperature, visibility, wind conditions, and other
 * weather parameters critical for road safety and winter weather operations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all weather information data from over 50 monitoring stations
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformation({});
 * console.log(weatherInfo[0].TemperatureInFahrenheit); // 89.24 (current temperature in °F)
 * console.log(weatherInfo[0].StationName); // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherInfo[0].Visibility); // 1 (visibility in miles)
 * ```
 */
export const getWeatherInformation = async (
  params: GetWeatherInformationParams = {}
) => {
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherInformationParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationParamsSchema
// GetWeatherInformationParams
// ============================================================================

export const getWeatherInformationParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all weather information. The API returns current weather data for all monitored weather stations across Washington State, including temperature, humidity, wind conditions, visibility, and barometric pressure from over 100 stations located throughout the state. This comprehensive weather network supports transportation safety, road condition monitoring, and weather forecasting for Washington State highways and transportation systems."
  );

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherInfoSchema
// WeatherInfo
// ============================================================================

export const weatherInfoSchema = z
  .object({
    BarometricPressure: zNullableNumber().describe(
      "Atmospheric pressure reading from the weather station in inches of mercury (inHg). This field indicates the current barometric pressure which is important for weather forecasting and aviation. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the weather station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the weather station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
    ),

    PrecipitationInInches: zNullableNumber().describe(
      "Current precipitation amount measured at the weather station in inches. This field shows the total precipitation that has fallen at the station location, typically measured over a 24-hour period. May be null if no precipitation has occurred or the sensor is not functioning."
    ),

    ReadingTime: zWsdotDate().describe(
      "Timestamp indicating when this weather information was last updated in the WSDOT system. This field shows the currency of the weather data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    RelativeHumidity: zNullableNumber().describe(
      "Relative humidity reading from the weather station as a percentage (0-100). This field indicates the amount of water vapor present in the air relative to the maximum amount possible at the current temperature. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    SkyCoverage: zNullableString().describe(
      "Description of current sky conditions and cloud coverage at the weather station. Examples include 'Clear', 'Partly Cloudy', 'Mostly Cloudy', 'Overcast', 'Fog', or 'Rain'. May be null if the observation is not available or the station does not have sky coverage monitoring."
    ),

    StationID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this weather station by the WSDOT system. This ID serves as a permanent, unique reference for the station across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes. Examples include ID 1909 (S 144th St on SB I-5 at mp 155.32), ID 1928 (EB I-90 / SR-18 (Echo Lake) at mp 26.30), ID 1966 (NE 130th Street on I-5 at mp 173.75), or ID 1983 (Satus Pass on US 97 at mp 27.20)."
      ),

    StationName: z
      .string()
      .describe(
        "Human-readable name for the weather station that provides quick identification. Examples include 'S 144th St on SB I-5 at mp 155.32' (I-5 southbound monitoring), 'EB I-90 / SR-18 (Echo Lake) at mp 26.30' (I-90 eastbound at mountain pass), 'NE 130th Street on I-5 at mp 173.75' (I-5 northbound in Lynnwood), 'Satus Pass on US 97 at mp 27.20' (US 97 mountain pass), or 'Rocky Canyon on I-90 at mp 95.74' (I-90 eastbound at canyon location). This field is the primary display name used in applications and often includes highway, direction, and milepost information."
      ),

    TemperatureInFahrenheit: zNullableNumber().describe(
      "Current air temperature reading from the weather station in degrees Fahrenheit. This field shows the actual temperature at the station location, which is critical for road condition monitoring, winter weather alerts, and general weather information. Examples include 89.24°F at I-5 southbound (high summer temperature), 92.30°F at I-90 Echo Lake (mountain pass temperature), 90.14°F at I-5 northbound (typical summer reading), or 102.74°F at US 2 mountain pass (extreme heat). May be null if the sensor is not functioning or the reading is unavailable."
    ),

    Visibility: zNullableNumber().describe(
      "Current visibility reading from the weather station in miles. This field indicates how far ahead drivers can see clearly, which is crucial for road safety during fog, rain, snow, or other low-visibility conditions. Examples include 1 mile (typical clear conditions at most stations), 6 miles (excellent visibility at mountain locations), or may be null when the sensor is not functioning. Good visibility (5+ miles) indicates clear driving conditions, while low visibility (under 1 mile) suggests potential hazards requiring caution."
    ),

    WindDirection: zNullableNumber().describe(
      "Current wind direction reading from the weather station in degrees (0-359). This field shows the direction from which the wind is blowing, where 0° is North, 90° is East, 180° is South, and 270° is West. Examples include 350° (NNW winds), 61° (ENE winds), 285° (WNW winds), or 255° (WSW winds). May be null if the sensor is not functioning or the reading is unavailable."
    ),

    WindDirectionCardinal: zNullableString().describe(
      "Current wind direction in cardinal direction format for easier interpretation. Examples include 'N' (North), 'NNE' (North-Northeast), 'ENE' (East-Northeast), 'WNW' (West-Northwest), 'WSW' (West-Southwest), 'S' (South), or 'N/A' when not available. This field provides a human-readable alternative to the numeric wind direction and is useful for weather reporting and safety warnings."
    ),

    WindGustSpeedInMPH: zNullableNumber().describe(
      "Current wind gust speed reading from the weather station in miles per hour. This field shows the highest wind speed recorded during a short time period, which is important for high wind warnings and transportation safety. Examples include 6 mph (light gusts), 8-11 mph (moderate gusts), or 17 mph (strong gusts at mountain locations). May be null if the sensor is not functioning or the reading is unavailable."
    ),

    WindSpeedInMPH: zNullableNumber().describe(
      "Current sustained wind speed reading from the weather station in miles per hour. This field shows the average wind speed over a longer time period, which is used for general weather conditions and wind advisories. Examples include 0-1 mph (calm conditions), 3-5 mph (light winds), 6-9 mph (moderate winds), or 11+ mph (strong winds). May be null if the sensor is not functioning or the reading is unavailable."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete weather information including temperature, humidity, wind, precipitation, and visibility data from a WSDOT weather station. This schema represents comprehensive weather data from the WSDOT Weather Information API, providing essential information for road condition monitoring, weather forecasting, and transportation safety. The weather details are critical for winter weather alerts, visibility warnings, and general weather monitoring across Washington State. Stations are located at strategic highway locations including mountain passes, urban corridors, and coastal areas, with temperature ranges from below freezing in winter to over 100°F in summer."
  );

export const weatherInfoArraySchema = z
  .array(weatherInfoSchema)
  .describe(
    "Array of weather information data for all active weather stations across Washington State. This comprehensive collection includes over 50 weather stations covering major highways like I-5, I-90, US 2, US 97, and SR 520. Stations are strategically located at mountain passes (Snoqualmie, Stevens, White Pass), urban corridors (Seattle, Tacoma, Bellevue), and coastal areas, providing essential weather data for road condition monitoring, weather forecasting, and transportation safety management."
  );

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformation
// ============================================================================

/**
 * Hook for getting all weather information from WSDOT Weather Information API
 *
 * Retrieves current weather data for all monitored weather stations across Washington State.
 * This hook provides real-time weather conditions that update frequently to support transportation
 * safety, winter weather operations, and road condition monitoring. The data includes temperature,
 * visibility, wind conditions, and other weather parameters from over 50 stations located at
 * mountain passes, urban areas, and coastal regions.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with all weather information data for real-time weather monitoring
 *
 * @example
 * ```typescript
 * const { data: weatherStations } = useWeatherInformation({});
 * console.log(weatherStations?.[0]?.TemperatureInFahrenheit); // 89.24
 * console.log(weatherStations?.[0]?.StationName); // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherStations?.find(s => s.StationID === 1928)?.Visibility); // I-90 Echo Lake visibility
 * ```
 */
export const useWeatherInformation = (
  params: GetWeatherInformationParams = {},
  options?: TanStackOptions<WeatherInfo[]>
): UseQueryResult<WeatherInfo[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformation",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformation(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
