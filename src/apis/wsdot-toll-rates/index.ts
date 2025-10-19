/**
 * @fileoverview WSDOT Toll Rates API - Clean exports for types, API definition, and resources
 *
 * This module provides a clean interface for the WSDOT Toll Rates API, exporting
 * all input/output types, the main API definition, and individual resource modules.
 */

// Export the main API definition (legacy format for backward compatibility)
// Export individual resources for direct use
export {
  tollRatesResource,
  tollTripInfoResource,
  tollTripRatesResource,
  tollTripVersionResource,
  wsdotTollRatesApi,
} from "./endpoints";

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
  TollRate,
  TollTripInfo,
  TollTripsRates as TollTrips,
  TollTripVersion,
  TripRate,
} from "./original/outputSchemas.original";
