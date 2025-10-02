/**
 * @fileoverview WSDOT Toll Rates API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Toll Rates API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotTollRatesApi } from "./endpoints";

// Export all input types
export type {
  GetTollRatesInput,
  GetTollTripInfoInput,
  GetTollTripRatesInput,
  GetTollTripVersionInput,
  GetTripRatesByDateInput,
  GetTripRatesByVersionInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  TollRatesList,
  TollTripInfoList,
  TollTrips,
  TollTripVersion,
  TripRatesList,
} from "./original/outputSchemas.original";
