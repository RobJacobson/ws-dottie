/**
 * @fileoverview WSDOT Weather Readings API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Weather Readings API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Weather Readings hooks from the main hooks file
export {
  useGetSubSurfaceMeasurements,
  useGetSurfaceMeasurements,
  useGetWeatherReadings,
} from "@/shared/tanstack/hooks";
