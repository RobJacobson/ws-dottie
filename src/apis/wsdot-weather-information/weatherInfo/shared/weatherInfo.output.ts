import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

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
        "Atmospheric pressure in millibars (not adjusted for elevation)."
      ),
    Latitude: z
      .number()
      .describe("Latitude of the weather station in decimal degrees."),
    Longitude: z
      .number()
      .describe("Longitude of the weather station in decimal degrees."),
    PrecipitationInInches: z
      .number()
      .nullable()
      .describe("Precipitation amount in inches."),
    ReadingTime: zDotnetDate().describe(
      "UTC datetime when the weather reading was taken."
    ),
    RelativeHumidity: z
      .number()
      .nullable()
      .describe("Relative humidity as a percentage (0-100)."),
    SkyCoverage: z.string().nullable().describe("Sky coverage condition code."),
    StationID: z.number().int().describe("Numeric ID of the weather station."),
    StationName: z
      .string()
      .nullable()
      .describe("Display name of the weather station."),
    TemperatureInFahrenheit: z
      .number()
      .nullable()
      .describe("Current air temperature in degrees Fahrenheit."),
    Visibility: z
      .number()
      .int()
      .nullable()
      .describe(
        "Average visibility distance in meters (computed every 3 minutes)."
      ),
    WindDirection: z
      .number()
      .nullable()
      .describe("Wind direction in degrees clockwise from north (0-359)."),
    WindDirectionCardinal: z
      .string()
      .nullable()
      .describe("Wind direction in cardinal format (e.g., 'N', 'S', 'WSW')."),
    WindGustSpeedInMPH: z
      .number()
      .nullable()
      .describe("Maximum wind gust speed in miles per hour."),
    WindSpeedInMPH: z
      .number()
      .nullable()
      .describe("Average wind speed in miles per hour."),
  })
  .describe(
    "Current atmospheric conditions from a WSDOT Road Weather Information System station, including temperature, humidity, wind, visibility, barometric pressure, and precipitation."
  );

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;
