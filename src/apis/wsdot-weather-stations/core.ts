/**
 * @fileoverview wsdot-weather-stations API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./weatherStations/shared/weatherStations.input";
export * from "./weatherStations/shared/weatherStations.output";
export { fetchWeatherStations } from "./weatherStations/weatherStations";
