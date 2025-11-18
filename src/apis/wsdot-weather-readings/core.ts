/**
 * @fileoverview wsdot-weather-readings API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./subSurfaceMeasurements/shared/subSurfaceMeasurements.input";
export * from "./subSurfaceMeasurements/shared/subSurfaceMeasurements.output";
export { fetchSubSurfaceMeasurements } from "./subSurfaceMeasurements/subSurfaceMeasurements";
export * from "./surfaceMeasurements/shared/surfaceMeasurements.input";
export * from "./surfaceMeasurements/shared/surfaceMeasurements.output";
export { fetchSurfaceMeasurements } from "./surfaceMeasurements/surfaceMeasurements";
export * from "./weatherReadings/shared/weatherReadings.input";
export * from "./weatherReadings/shared/weatherReadings.output";
export { fetchWeatherReadings } from "./weatherReadings/weatherReadings";
