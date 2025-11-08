import { z } from "@/shared/zod-openapi-init";

/**
 * WeatherStationData schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherStationSchema = z
  .object({
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
    StationCode: z
      .int()
      .describe(
        "Unique weather station identifier code, as an integer ID. E.g., '1909' for S 144th St station on SB I-5, '1910' for NE 195th station on SB I-405, '1928' for Echo Lake station on EB I-90, '1913' for Bear Creek Bridge station. Used as primary key for station identification and weather data lookups."
      ),
    StationName: z
      .string()
      .nullable()
      .describe(
        "WSDOT-assigned common name for weather station, as a station name. E.g., 'S 144th St on SB I-5 at mp 155.32' for station 1909, 'NE 195th on SB I-405 at mp 24.58' for station 1910, 'Bear Creek Bridge' for station 1913, 'EB I-90 / SR-18 (Echo Lake) at mp 26.30' for station 1928, null when station name is unavailable. Provides location identification for weather station."
      ),
  })
  .describe(
    "Represents weather station metadata including station identifier, name, and location coordinates. E.g., station 1909 (S 144th St on SB I-5) at location 47.4748, -122.2704. Used for weather station discovery, location-based queries, and identifying stations for weather data retrieval. Provides reference information for weather station lookups."
  );

export type WeatherStation = z.infer<typeof weatherStationSchema>;

// Alias for backward compatibility
export type WeatherStationData = WeatherStation;
