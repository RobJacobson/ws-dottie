// WSDOT Weather Information Extended API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import { getWeatherInformationExtended } from "./api";
import type { WeatherInformationExtendedResponse } from "./types";

/**
 * React Query hook for retrieving extended weather information
 * This endpoint provides additional weather readings including surface and subsurface measurements
 *
 * @returns React Query result containing extended weather information data
 *
 * @example
 * ```typescript
 * const { data: weatherReadings, isLoading, error } = useWeatherInformationExtended();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {weatherReadings?.map(reading => (
 *       <div key={reading.StationId}>
 *         <h3>{reading.StationName}</h3>
 *         <p>Air Temperature: {reading.AirTemperature}°C</p>
 *         <p>Elevation: {reading.Elevation} ft</p>
 *         <p>Surface Temperature: {reading.SurfaceMeasurements[0]?.SurfaceTemperature}°C</p>
 *         <p>Snow Depth: {reading.SnowDepth} cm</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useWeatherInformationExtended = (
  options?: Parameters<typeof useQuery<WeatherInformationExtendedResponse>>[0]
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information-extended",
      "getWeatherInformationExtended",
    ],
    queryFn: getWeatherInformationExtended,
    ...tanstackQueryOptions.HOURLY_UPDATES,
    ...options,
  });
};
