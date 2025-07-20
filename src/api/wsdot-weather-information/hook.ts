// WSDOT Weather Information API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { createFrequentUpdateOptions } from "@/shared/caching";

import {
  getWeatherInformation,
  getWeatherInformationByStationId,
  getWeatherInformationForStations,
} from "./api";
import type { WeatherInfo, WeatherInformationResponse } from "./types";

/**
 * React Query hook for retrieving all weather information
 *
 * @returns React Query result containing weather information data
 *
 * @example
 * ```typescript
 * const { data: weatherInfo, isLoading, error } = useWeatherInformation();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {weatherInfo?.map(station => (
 *       <div key={station.StationID}>
 *         <h3>{station.StationName}</h3>
 *         <p>Temperature: {station.TemperatureInFahrenheit}°F</p>
 *         <p>Humidity: {station.RelativeHumidity}%</p>
 *         <p>Wind: {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useWeatherInformation = () => {
  return useQuery<WeatherInformationResponse>({
    queryKey: ["weatherInformation"],
    queryFn: getWeatherInformation,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * React Query hook for retrieving weather information for a specific station
 *
 * @param stationId - The ID of the specific weather station
 * @returns React Query result containing weather information data
 *
 * @example
 * ```typescript
 * const { data: weatherInfo, isLoading, error } = useWeatherInformationByStationId(1909);
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <h2>{weatherInfo?.StationName}</h2>
 *     <p>Temperature: {weatherInfo?.TemperatureInFahrenheit}°F</p>
 *     <p>Humidity: {weatherInfo?.RelativeHumidity}%</p>
 *     <p>Wind: {weatherInfo?.WindSpeedInMPH} mph {weatherInfo?.WindDirectionCardinal}</p>
 *     <p>Pressure: {weatherInfo?.BarometricPressure} hPa</p>
 *     <p>Visibility: {weatherInfo?.Visibility} miles</p>
 *   </div>
 * );
 * ```
 */
export const useWeatherInformationByStationId = (stationId: number) => {
  return useQuery<WeatherInfo>({
    queryKey: ["weatherInformation", stationId],
    queryFn: () => getWeatherInformationByStationId(stationId),
    ...createFrequentUpdateOptions(),
    enabled: stationId > 0,
  });
};

/**
 * React Query hook for retrieving weather information for multiple stations
 *
 * @param stationIds - Comma-separated list of station IDs
 * @returns React Query result containing weather information data
 *
 * @example
 * ```typescript
 * const { data: weatherInfo, isLoading, error } = useWeatherInformationForStations("1909,1910,1928");
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {weatherInfo?.map(station => (
 *       <div key={station.StationID}>
 *         <h3>{station.StationName}</h3>
 *         <p>Temperature: {station.TemperatureInFahrenheit}°F</p>
 *         <p>Humidity: {station.RelativeHumidity}%</p>
 *         <p>Wind: {station.WindSpeedInMPH} mph {station.WindDirectionCardinal}</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useWeatherInformationForStations = (stationIds: string) => {
  return useQuery<WeatherInformationResponse>({
    queryKey: ["weatherInformation", "stations", stationIds],
    queryFn: () => getWeatherInformationForStations(stationIds),
    ...createFrequentUpdateOptions(),
    enabled: stationIds.length > 0,
  });
};
