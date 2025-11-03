import { z } from "@/shared/zod-openapi-init";

import { zDotnetDate } from "@/apis/shared";

/**
 * WeatherInfo schema
 *
 * Current information from a weather station.
 */
export const weatherInfoSchema = z
  .object({
    BarometricPressure: z
      .number()
      .nullable()
      .describe(
        "Atmospheric pressure reading at weather station, as millibars. E.g., '968.5' for 968.5 millibars at S 144th St station, '969.6' for 969.6 millibars at NE 195th station, '1016' for 1016 millibars at NE 130th Street station, null when barometric pressure reading is unavailable. Reading is not adjusted for site elevation. Used for weather condition assessment and pressure trend analysis."
      ),
    Latitude: z
      .number()
      .describe(
        "GPS latitude coordinate for weather station location, in decimal degrees. E.g., '47.4748' for S 144th St station on I-5, '47.760632547' for NE 195th station on I-405, '47.509' for Echo Lake station on I-90."
      ),
    Longitude: z
      .number()
      .describe(
        "GPS longitude coordinate for weather station location, in decimal degrees. E.g., '-122.2704' for S 144th St station, '-122.18404783' for NE 195th station, '-121.885' for Echo Lake station."
      ),
    PrecipitationInInches: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount measured at weather station, as inches. E.g., null when no precipitation has occurred or measurement is unavailable. Used for rainfall tracking and precipitation monitoring."
      ),
    ReadingTime: zDotnetDate().describe(
      "Timestamp when weather reading was taken, as a UTC datetime. E.g., '2025-11-02T19:00:00.000Z' for reading at 7:00 PM on November 2, 2025. Indicates data freshness and when weather measurements occurred."
    ),
    RelativeHumidity: z
      .number()
      .nullable()
      .describe(
        "Percent of moisture in air relative to saturation, as percent. E.g., '73' for 73% humidity at S 144th St station, '72' for 72% humidity at Echo Lake station, null when humidity reading is unavailable. Range 0-100% where 0% indicates no moisture and 100% indicates completely saturated air. Used for comfort assessment and weather condition analysis."
      ),
    SkyCoverage: z
      .string()
      .nullable()
      .describe(
        "Description of sky coverage conditions, as a sky condition code. E.g., 'N/A' when sky coverage data is not available, null when sky coverage is unavailable. Used for cloud cover assessment."
      ),
    StationID: z
      .int()
      .describe(
        "Unique weather station identifier, as an integer ID. E.g., '1909' for S 144th St station on SB I-5, '1910' for NE 195th station on SB I-405, '1928' for Echo Lake station on EB I-90. Used as primary key for station identification and lookups."
      ),
    StationName: z
      .string()
      .nullable()
      .describe(
        "WSDOT-assigned name for weather station, as a station name. E.g., 'S 144th St on SB I-5 at mp 155.32' for station 1909, 'NE 195th on SB I-405 at mp 24.58' for station 1910, 'EB I-90 / SR-18 (Echo Lake) at mp 26.30' for station 1928, null when station name is unavailable. Provides location identification for weather station."
      ),
    TemperatureInFahrenheit: z
      .number()
      .nullable()
      .describe(
        "Current air temperature reading at weather station, as degrees Fahrenheit. E.g., '54.14' for 54.14°F at S 144th St station, '50.36' for 50.36°F at Echo Lake station, '53.6' for 53.6°F at NE 130th Street station, null when temperature reading is unavailable. Used for temperature monitoring and weather condition assessment."
      ),
    Visibility: z
      .int()
      .nullable()
      .describe(
        "Average visibility distance that can be seen, as meters. E.g., '1' for 1 meter visibility (very low) at multiple stations, '6' for 6 meters visibility at Alpowa Summit station, null when visibility reading is unavailable. Computed every three minutes for both day and night conditions. Used for fog, smoke, and visibility condition assessment."
      ),
    WindDirection: z
      .number()
      .nullable()
      .describe(
        "Wind direction measured in degrees from north, as degrees. E.g., '180' for 180 degrees (south) at S 144th St station, '5' for 5 degrees (north) at NE 195th station, '241' for 241 degrees (west-southwest) at Echo Lake station, null when wind direction reading is unavailable. Measured clockwise from north (0-359 degrees)."
      ),
    WindDirectionCardinal: z
      .string()
      .nullable()
      .describe(
        "Wind direction in cardinal direction format, as a cardinal direction. E.g., 'S' for south wind at S 144th St station, 'N' for north wind at NE 195th station, 'WSW' for west-southwest wind at Echo Lake station, 'E' for east wind at NE 130th Street station, null when cardinal direction is unavailable. Human-readable format for wind direction display."
      ),
    WindGustSpeedInMPH: z
      .number()
      .nullable()
      .describe(
        "Maximum wind gust speed measured at weather station, as miles per hour. E.g., '8' for 8 mph gusts at S 144th St station, '10' for 10 mph gusts at Echo Lake station, '22' for 22 mph gusts at Alpowa Summit station, null when wind gust reading is unavailable. Used for wind condition assessment and safety monitoring."
      ),
    WindSpeedInMPH: z
      .number()
      .nullable()
      .describe(
        "Average wind speed measured at weather station, as miles per hour. E.g., '1' for 1 mph wind at S 144th St station, '5' for 5 mph wind at Echo Lake station, '16' for 16 mph wind at Alpowa Summit station, null when wind speed reading is unavailable. Used for wind condition assessment and weather monitoring."
      ),
  })
  .describe(
    "Represents current weather information from weather station including temperature, humidity, wind conditions, visibility, barometric pressure, and precipitation data. E.g., station 1909 (S 144th St on SB I-5) with temperature 54.14°F, humidity 73%, wind 1 mph from south, visibility 1 meter, barometric pressure 968.5 millibars. Used for weather monitoring, road condition assessment, and environmental data collection. Data updated periodically throughout the day."
  );

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;
