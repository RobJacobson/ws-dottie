// WSDOT Weather Stations API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { fetchWsdot } from "@/shared/fetching/fetchWsdot";

import type { WeatherStationData, WeatherStationsResponse } from "./types";

/**
 * Retrieves a list of WSDOT weather stations
 * This endpoint provides information about all weather stations maintained by WSDOT
 *
 * @returns Promise resolving to an array of weather station data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherStations = await getWeatherStations();
 * console.log(weatherStations[0].StationName); // "S 144th St on SB I-5 at mp 155.32"
 * ```
 */
export const getWeatherStations =
  async (): Promise<WeatherStationsResponse> => {
    return await fetchWsdot<WeatherStationsResponse>(
      "weatherStations",
      "/GetCurrentStationsAsJson"
    );
  };
