import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * WeatherInfo schema
 *
 * Current information from a weather station.
 */
export const weatherInfoSchema = z
  .object({
    /** The force per unit area exerted by the atmosphere in millibars. This reading is not adjusted for site elevation. */
    BarometricPressure: z
      .number()
      .nullable()
      .describe(
        "The force per unit area exerted by the atmosphere in millibars. This reading is not adjusted for site elevation."
      ),
    /** Latitude of station. */
    Latitude: z.number().describe("Latitude of station."),
    /** Longitude of station. */
    Longitude: z.number().describe("Longitude of station."),
    /** Precipitation in inches. */
    PrecipitationInInches: z
      .number()
      .nullable()
      .describe("Precipitation in inches."),
    /** Date and Time reading was taken. */
    ReadingTime: zWsdotDate().describe("Date and Time reading was taken."),
    /**
     * Percent of moisture in the air. A relative humidity of 0% shows that the air contains no moisture and 100% shows that the air is completely saturated and cannot absorb more moisture.
     */
    RelativeHumidity: z
      .number()
      .nullable()
      .describe(
        "Percent of moisture in the air. A relative humidity of 0% shows that the air contains no moisture and 100% shows that the air is completely saturated and cannot absorb more moisture."
      ),
    /** Sky coverage. */
    SkyCoverage: z.string().nullable().describe("Sky coverage."),
    /** Station ID. */
    StationID: z.int().describe("Station ID."),
    /** WSDOT assigned name. */
    StationName: z.string().nullable().describe("WSDOT assigned name."),
    /** Temperature in Fahrenheit. */
    TemperatureInFahrenheit: z
      .number()
      .nullable()
      .describe("Temperature in Fahrenheit."),
    /**
     * Average distance that you can see, both day and night, computed every three minutes in meters.
     */
    Visibility: z
      .int()
      .nullable()
      .describe(
        "Average distance that you can see, both day and night, computed every three minutes in meters."
      ),
    /** Wind direction. */
    WindDirection: z.number().nullable().describe("Wind direction."),
    /** Wind direction cardinal. */
    WindDirectionCardinal: z
      .string()
      .nullable()
      .describe("Wind direction cardinal."),
    /** Wind gust speed in MPH. */
    WindGustSpeedInMPH: z
      .number()
      .nullable()
      .describe("Wind gust speed in MPH."),
    /** Wind speed in MPH. */
    WindSpeedInMPH: z.number().nullable().describe("Wind speed in MPH."),
  })
  .describe("Current information from a weather station.");

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;
