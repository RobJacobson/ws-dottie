/**
 * @fileoverview WSDOT Toll Rates API - Clean exports for types, API definition, and resources
 *
 * This module provides a clean interface for the WSDOT Toll Rates API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export main API definition (legacy format for backward compatibility)
// Export individual resources for direct use
export {
  tollRatesResource,
  tollTripInfoResource,
  tollTripRatesResource,
  tollTripVersionResource,
  wsdotTollRatesApi,
} from "./apiDefinition";
// Export all core functions
export {
  getTollRates,
  getTollTripInfo,
  getTollTripRates,
  getTollTripVersion,
  getTripRatesByDate,
  getTripRatesByVersion,
} from "./core";
// Export all React hooks
export {
  useGetTollRates,
  useGetTollTripInfo,
  useGetTollTripRates,
  useGetTollTripVersion,
  useGetTripRatesByDate,
  useGetTripRatesByVersion,
} from "./hooks";
// Export all input types
export type { GetTollRatesInput } from "./tollRates/tollRates.input";
// Export all output types
export type { TollRate } from "./tollRates/tollRates.output";
export type { GetTollTripInfoInput } from "./tollTripInfo/tollTripInfo.input";
export type { TollTripInfo } from "./tollTripInfo/tollTripInfo.output";
export type {
  GetTollTripRatesInput,
  GetTripRatesByDateInput,
  GetTripRatesByVersionInput,
} from "./tollTripRates/tollTripRates.input";
export type {
  TollTripsRates as TollTrips,
  TripRate,
} from "./tollTripRates/tollTripRates.output";
export type { GetTollTripVersionInput } from "./tollTripVersion/tollTripVersion.input";
export type { TollTripVersion } from "./tollTripVersion/tollTripVersion.output";
