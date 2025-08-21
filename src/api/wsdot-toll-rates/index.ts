// WSDOT Toll Rates API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

// API functions
export {
  getTollRates,
  getTollTripInfo,
  getTollTripRates,
} from "./api";
// Input parameter types
export type {
  GetTollRatesParams,
  GetTollTripInfoParams,
  GetTollTripRatesParams,
} from "./inputs";
// Export types
export type {
  TollRate,
  TollTripInfo,
  TollTripRate,
  TollTripRates,
} from "./outputs";
// React Query hooks
export {
  useTollRates,
  useTollTripInfo,
  useTollTripRates,
} from "./queries";
