/**
 * @fileoverview WSDOT Weather Readings API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Weather Readings API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { GetSubSurfaceMeasurementsInput } from "./subSurfaceMeasurements/subSurfaceMeasurements.input";
import type { ScanwebSubSurfaceMeasurements } from "./subSurfaceMeasurements/subSurfaceMeasurements.output";
import type { GetSurfaceMeasurementsInput } from "./surfaceMeasurements/surfaceMeasurements.input";
import type { ScanwebSurfaceMeasurements } from "./surfaceMeasurements/surfaceMeasurements.output";
import type { GetWeatherReadingsInput } from "./weatherReadings/weatherReadings.input";
import type { WeatherReading } from "./weatherReadings/weatherReadings.output";

// Create strongly-typed functions using the factory
export const getWeatherReadings = createApiFunction<
  GetWeatherReadingsInput,
  WeatherReading[]
>("wsdot-weather-readings:getWeatherReadings");
export const getSurfaceMeasurements = createApiFunction<
  GetSurfaceMeasurementsInput,
  ScanwebSurfaceMeasurements[]
>("wsdot-weather-readings:getSurfaceMeasurements");
export const getSubSurfaceMeasurements = createApiFunction<
  GetSubSurfaceMeasurementsInput,
  ScanwebSubSurfaceMeasurements[]
>("wsdot-weather-readings:getSubSurfaceMeasurements");
