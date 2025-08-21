import { z } from "zod";

import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

/**
 * WSDOT Weather Information API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Weather Information API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// WEATHER INFORMATION SCHEMA
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
        "Unique identifier assigned to this weather station by the WSDOT system. This ID serves as a permanent, unique reference for the station across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    StationName: z
      .string()
      .describe(
        "Human-readable name for the weather station that provides quick identification. Examples include 'Snoqualmie Pass', 'Stevens Pass', 'White Pass', 'Crystal Mountain', or 'Mount Baker'. This field is the primary display name used in applications."
      ),

    TemperatureInFahrenheit: zNullableNumber().describe(
      "Current air temperature reading from the weather station in degrees Fahrenheit. This field shows the actual temperature at the station location, which is critical for road condition monitoring, winter weather alerts, and general weather information. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    Visibility: zNullableNumber().describe(
      "Current visibility reading from the weather station in miles. This field indicates how far ahead drivers can see clearly, which is crucial for road safety during fog, rain, snow, or other low-visibility conditions. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    WindDirection: zNullableNumber().describe(
      "Current wind direction reading from the weather station in degrees (0-359). This field shows the direction from which the wind is blowing, where 0° is North, 90° is East, 180° is South, and 270° is West. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    WindDirectionCardinal: zNullableString().describe(
      "Current wind direction in cardinal direction format for easier interpretation. Examples include 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', or 'N/A'. This field provides a human-readable alternative to the numeric wind direction. May be null if the observation is not available."
    ),

    WindGustSpeedInMPH: zNullableNumber().describe(
      "Current wind gust speed reading from the weather station in miles per hour. This field shows the highest wind speed recorded during a short time period, which is important for high wind warnings and transportation safety. May be null if the sensor is not functioning or the reading is unavailable."
    ),

    WindSpeedInMPH: zNullableNumber().describe(
      "Current sustained wind speed reading from the weather station in miles per hour. This field shows the average wind speed over a longer time period, which is used for general weather conditions and wind advisories. May be null if the sensor is not functioning or the reading is unavailable."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete weather information including temperature, humidity, wind, precipitation, and visibility data from a WSDOT weather station. This schema represents comprehensive weather data from the WSDOT Weather Information API, providing essential information for road condition monitoring, weather forecasting, and transportation safety. The weather details are critical for winter weather alerts, visibility warnings, and general weather monitoring across Washington State."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const weatherInfoArraySchema = z
  .array(weatherInfoSchema)
  .describe(
    "Array of weather information data for all active weather stations across Washington State. This collection provides comprehensive weather information that enables road condition monitoring, weather forecasting, and transportation safety management."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;
export type WeatherInformationResponse = z.infer<typeof weatherInfoArraySchema>;
