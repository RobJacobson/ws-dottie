/**
 * @fileoverview wsdot-weather-information API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export { fetchCurrentWeatherForStations } from "./weatherInfo/currentWeatherForStations";
export { searchWeatherInformation } from "./weatherInfo/searchWeatherInformation";
export * from "./weatherInfo/shared/weatherInfo.input";
export * from "./weatherInfo/shared/weatherInfo.output";
export { fetchWeatherInformation } from "./weatherInfo/weatherInformation";
export { fetchWeatherInformationByStationId } from "./weatherInfo/weatherInformationByStationId";
