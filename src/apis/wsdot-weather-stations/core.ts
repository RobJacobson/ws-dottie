/**
 * @fileoverview WSDOT Weather Stations API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Weather Stations API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { WeatherStationsInput } from "./weatherStations/weatherStations.input";
import type { WeatherStation } from "./weatherStations/weatherStations.output";

// Create strongly-typed functions using the factory
export const getWeatherStations = createApiFunction<
  WeatherStationsInput,
  WeatherStation[]
>("wsdot-weather-stations:getWeatherStations");
