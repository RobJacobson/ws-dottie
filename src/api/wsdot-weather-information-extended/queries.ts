// WSDOT Weather Information Extended API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import { getWeatherInformationExtended } from "./api";
import type { WeatherReading } from "./schemas";

/**
 * React Query hook for retrieving extended weather information
 *
 * Retrieves additional weather readings including surface and subsurface
 * measurements from WSDOT weather stations.
 *
 * @param options - Optional query options
 * @returns React Query result containing extended weather information data
 *
 * @example
 * ```typescript
 * const { data: weatherReadings } = useWeatherInformationExtended();
 * console.log(weatherReadings[0].AirTemperature); // 14.7
 * ```
 */
export const useWeatherInformationExtended = (
  options?: QueryOptionsWithoutKey<WeatherReading[]>
): UseQueryResult<WeatherReading[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information-extended",
      "getWeatherInformationExtended",
    ],
    queryFn: () => getWeatherInformationExtended(),
    ...tanstackQueryOptions.HOURLY_UPDATES,
    ...options,
  });
};
