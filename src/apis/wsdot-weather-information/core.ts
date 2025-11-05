/**
 * @fileoverview WSDOT Weather Information API - Core Functions
 *
 * This module provides strongly-typed functions for WSDOT Weather Information API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type {
  GetCurrentWeatherForStationsInput,
  GetCurrentWeatherInformationByStationIDInput,
  GetCurrentWeatherInformationInput,
  SearchWeatherInformationInput,
} from "./weatherInfo/weatherInfo.input";
import type { WeatherInfo } from "./weatherInfo/weatherInfo.output";

// Create strongly-typed functions using the factory
export const getWeatherInformation = createApiFunction<
  GetCurrentWeatherInformationInput,
  WeatherInfo[]
>("wsdot-weather-information:getWeatherInformation");
export const getWeatherInformationByStationId = createApiFunction<
  GetCurrentWeatherInformationByStationIDInput,
  WeatherInfo
>("wsdot-weather-information:getWeatherInformationByStationId");
export const getCurrentWeatherForStations = createApiFunction<
  GetCurrentWeatherForStationsInput,
  WeatherInfo[]
>("wsdot-weather-information:getCurrentWeatherForStations");
export const searchWeatherInformation = createApiFunction<
  SearchWeatherInformationInput,
  WeatherInfo[]
>("wsdot-weather-information:searchWeatherInformation");
