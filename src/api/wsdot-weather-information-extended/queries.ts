// WSDOT Weather Information Extended API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import { getWeatherInformationExtended } from "./api";
import type { GetWeatherInformationExtendedParams } from "./inputs";
import type { WeatherReading } from "./outputs";

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
 * console.log(weatherReadings[0].AirTemperature); // 14.7
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
      params,
    ],
    queryFn: () => getWeatherInformationExtended(params),
    ...tanstackQueryOptions.HOURLY_UPDATES,
    ...options,
  });
};
