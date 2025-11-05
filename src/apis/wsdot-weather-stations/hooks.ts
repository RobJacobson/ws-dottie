/**
 * @fileoverview WSDOT Weather Stations API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSDOT Weather Stations API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSDOT Weather Stations hooks from the main hooks file
export { useGetWeatherStations } from "@/shared/tanstack/hooks";
