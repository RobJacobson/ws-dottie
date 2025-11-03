import { z } from "@/shared/zod-openapi-init";

import { zIsoDateString } from "@/apis/shared";

/**
 * WeatherReading schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherReadingSchema = z
  .object({
    StationId: z
      .string()
      .describe(
        "National Weather Service assigned identifier for weather station, as a station code. E.g., 'KSEA' for Seattle area stations, 'KPDX' for Portland area stations, 'KSFO' for San Francisco area stations. Used for cross-referencing with NWS weather data systems and national weather service integration."
      ),
    StationName: z
      .string()
      .describe(
        "WSDOT-assigned name for weather station, as a station name. E.g., 'S 144th St on SB I-5 at mp 155.32' for station on I-5, 'NE 195th on SB I-405 at mp 24.58' for station on I-405, 'EB I-90 / SR-18 (Echo Lake) at mp 26.30' for Echo Lake station. Provides location identification for weather station and context for reading location."
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
    Elevation: z
      .int()
      .describe(
        "Elevation of weather station above sea level, as meters. E.g., '150' for 150 meters elevation, '500' for 500 meters elevation. Used for understanding station altitude and weather context."
      ),
    ReadingTime: zIsoDateString()
      .nullable()
      .describe(
        "Timestamp when comprehensive weather reading was taken, as an ISO datetime string. E.g., '2025-11-02T19:00:00Z' for reading at 7:00 PM UTC on November 2, 2025, null when reading time is unavailable. Indicates data freshness and when all measurements occurred."
      ),
    AirTemperature: z
      .number()
      .nullable()
      .describe(
        "Current air temperature reading at weather station, as degrees Celsius. E.g., '12.3' for 12.3°C air temperature, '-5.2' for -5.2°C air temperature, null when temperature reading is unavailable. Used for temperature monitoring and weather condition assessment."
      ),
    RelativeHumidty: z
      .int()
      .nullable()
      .describe(
        "Percent of moisture in air relative to saturation, as percent. E.g., '73' for 73% humidity, '45' for 45% humidity, null when humidity reading is unavailable. Range 0-100% where 0% indicates no moisture and 100% indicates completely saturated air. Used for comfort assessment and weather condition analysis."
      ),
    AverageWindSpeed: z
      .int()
      .nullable()
      .describe(
        "Average wind speed during evaluation cycle, as kilometers per hour. E.g., '15' for 15 km/h average wind, '25' for 25 km/h average wind, null when wind speed reading is unavailable. Used for wind condition assessment and weather monitoring."
      ),
    AverageWindDirection: z
      .int()
      .nullable()
      .describe(
        "Average wind direction during evaluation cycle, as degrees from north. E.g., '180' for 180 degrees (south), '270' for 270 degrees (west), null when wind direction reading is unavailable. Measured clockwise from north (0-359 degrees)."
      ),
    WindGust: z
      .int()
      .nullable()
      .describe(
        "Maximum wind gust speed measured during evaluation cycle, as kilometers per hour. E.g., '30' for 30 km/h gusts, '50' for 50 km/h gusts, null when wind gust reading is unavailable. Monitoring period varies by RWIS site type and manufacturer. Used for wind condition assessment and safety monitoring."
      ),
    Visibility: z
      .int()
      .nullable()
      .describe(
        "Average visibility distance that can be seen, as meters. E.g., '1000' for 1000 meters visibility, '500' for 500 meters visibility, null when visibility reading is unavailable. Computed every three minutes for both day and night conditions. Used for fog, smoke, and visibility condition assessment."
      ),
    PrecipitationIntensity: z
      .int()
      .nullable()
      .describe(
        "Intensity of precipitation derived from precipitation rate, as intensity units. E.g., '5' for light precipitation intensity, '15' for moderate intensity, null when precipitation intensity is unavailable. Used for precipitation rate assessment."
      ),
    PrecipitationType: z
      .int()
      .nullable()
      .describe(
        "Type of precipitation detected by sensor, as a precipitation type code. E.g., '1' for rain, '2' for snow, '0' for no precipitation when sensor only detects presence/absence, null when precipitation type is unavailable. Some sensors only detect presence (1) or absence (0) of precipitation. Used for precipitation type identification."
      ),
    PrecipitationPast1Hour: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (rainfall or snowfall liquid equivalent) for previous 1 hour period, as millimeters. E.g., '2.5' for 2.5 mm precipitation in past hour, null when 1-hour precipitation is unavailable. Used for short-term precipitation tracking."
      ),
    PrecipitationPast3Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (rainfall or snowfall liquid equivalent) for previous 3 hour period, as millimeters. E.g., '5.2' for 5.2 mm precipitation in past 3 hours, null when 3-hour precipitation is unavailable. Used for medium-term precipitation tracking."
      ),
    PrecipitationPast6Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (rainfall or snowfall liquid equivalent) for previous 6 hour period, as millimeters. E.g., '8.7' for 8.7 mm precipitation in past 6 hours, null when 6-hour precipitation is unavailable. Used for extended precipitation tracking."
      ),
    PrecipitationPast12Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (rainfall or snowfall liquid equivalent) for previous 12 hour period, as millimeters. E.g., '12.3' for 12.3 mm precipitation in past 12 hours, null when 12-hour precipitation is unavailable. Used for half-day precipitation tracking."
      ),
    PrecipitationPast24Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (rainfall or snowfall liquid equivalent) for previous 24 hour period, as millimeters. E.g., '20.5' for 20.5 mm precipitation in past 24 hours, null when 24-hour precipitation is unavailable. Used for daily precipitation tracking."
      ),
    PrecipitationAccumulation: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (rainfall or snowfall liquid equivalent) from midnight GMT to current time, as millimeters. E.g., '15.2' for 15.2 mm accumulation since midnight GMT, null when accumulation is unavailable. Resets to zero at midnight GMT. Used for daily precipitation totals."
      ),
    BarometricPressure: z
      .int()
      .nullable()
      .describe(
        "Atmospheric pressure reading at weather station, as millibars. E.g., '1013' for 1013 millibars, '968' for 968 millibars, null when barometric pressure reading is unavailable. Reading is not adjusted for site elevation. Used for weather condition assessment and pressure trend analysis."
      ),
    SnowDepth: z
      .int()
      .nullable()
      .describe(
        "Depth of snow on representative areas excluding highway pavement, as centimeters. E.g., '15' for 15 cm snow depth, '30' for 30 cm snow depth, null when snow depth reading is unavailable. Avoids drifts and plowed areas. Used for snow accumulation monitoring."
      ),
    SurfaceMeasurements: z
      .array(
        z.object({
          SensorId: z
            .int()
            .describe(
              "Unique surface sensor identifier at weather station, as an integer ID. E.g., '1' for first surface sensor, '2' for second surface sensor. Identifies which surface sensor recorded the measurement."
            ),
          SurfaceTemperature: z
            .number()
            .nullable()
            .describe(
              "Current pavement surface temperature reading, as degrees Celsius. E.g., '5.2' for 5.2°C surface temperature, '-2.1' for -2.1°C (below freezing) surface temperature. Used for road condition assessment."
            ),
          RoadFreezingTemperature: z
            .number()
            .nullable()
            .describe(
              "Freezing point of moisture on pavement based on chemical treatment, as degrees Celsius. E.g., '-5.0' for freezing point at -5°C with de-icing chemicals. Calculated based on specific chemical in use. Used for winter maintenance."
            ),
          RoadSurfaceCondition: z
            .union([
              z.literal(101),
              z.literal(102),
              z.literal(103),
              z.literal(104),
              z.literal(105),
            ])
            .nullable()
            .describe(
              "Road surface condition code detected by sensor, as a condition code. Valid values: 101 (Dry), 102 (Wet), 103 (Moist), 104 (Ice), 105 (Snow). Used for road condition assessment."
            ),
        })
      )
      .nullable()
      .describe(
        "Array of surface sensor measurements including pavement temperature, road freezing temperature, and surface condition codes. E.g., array with sensor 1 showing surface temperature 5.2°C and condition 102 (wet). Used for road condition monitoring and winter maintenance operations."
      ),
    SubSurfaceMeasurements: z
      .array(
        z.object({
          SensorId: z
            .int()
            .describe(
              "Unique subsurface sensor identifier at weather station, as an integer ID. E.g., '1' for first subsurface sensor, '2' for second subsurface sensor. Identifies which subsurface sensor recorded the measurement."
            ),
          SubSurfaceTemperature: z
            .number()
            .nullable()
            .describe(
              "Temperature reading from sensor embedded below road pavement, as degrees Celsius. E.g., '8.5' for 8.5°C subsurface temperature. Sensors typically embedded 12-18 inches below pavement surface. Used for ground temperature monitoring."
            ),
        })
      )
      .nullable()
      .describe(
        "Array of subsurface sensor measurements including ground temperature from sensors embedded below road pavement. E.g., array with sensor 1 showing subsurface temperature 8.5°C. Used for ground temperature monitoring and predicting road surface conditions."
      ),
  })
  .describe(
    "Represents comprehensive weather reading from weather station including air temperature, humidity, wind conditions, visibility, precipitation data across multiple time periods, barometric pressure, snow depth, and surface/subsurface sensor measurements. E.g., station with air temperature 12.3°C, humidity 73%, wind 15 km/h, visibility 1000 meters, and surface measurements showing wet conditions. Used for complete weather station data access, road condition assessment, and comprehensive weather analysis. Data updated periodically throughout the day."
  );

export type WeatherReading = z.infer<typeof weatherReadingSchema>;
