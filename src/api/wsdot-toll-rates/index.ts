/**
 * WSDOT Toll Rates API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * toll rate data including trip rates, toll information, and pricing schedules.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getTollRates";
export * from "./getTollTripInfo";
export * from "./getTollTripRates";
export * from "./getTollTripVersion";
export * from "./getTripRatesByDate";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  getTollRatesParamsSchema,
  tollRateArraySchema,
  tollRateSchema,
} from "./getTollRates";
export {
  getTollTripInfoParamsSchema,
  tollTripInfoArraySchema,
  tollTripInfoSchema,
} from "./getTollTripInfo";
export {
  getTollTripRatesParamsSchema,
  tollTripRateSchema,
  tollTripRatesSchema,
} from "./getTollTripRates";
export {
  getTollTripVersionParamsSchema,
  tollTripVersionSchema,
} from "./getTollTripVersion";
export { getTripRatesByDateParamsSchema } from "./getTripRatesByDate";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetTollRatesParams,
  TollRate,
} from "./getTollRates";
export type {
  GetTollTripInfoParams,
  TollTripInfo,
} from "./getTollTripInfo";
export type {
  GetTollTripRatesParams,
  TollTripRate,
} from "./getTollTripRates";
export type {
  GetTollTripVersionParams,
  TollTripVersion,
} from "./getTollTripVersion";
export type { GetTripRatesByDateParams } from "./getTripRatesByDate";
