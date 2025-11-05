/**
 * @fileoverview WSDOT Weather Information API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Weather Information API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Weather Information hooks from the main hooks file
export {
  useGetCurrentWeatherForStations,
  useGetWeatherInformation,
  useGetWeatherInformationByStationId,
  useSearchWeatherInformation,
} from "@/shared/tanstack/hooks";
