// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./tollRates";
export * from "./tollTripInfo";
export * from "./tollTripRates";
export * from "./tollTripVersion";
export * from "./tripRatesByDate";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  tollRateArraySchema,
  tollRateSchema,
  getTollRatesParamsSchema,
} from "./tollRates";

export {
  tollTripInfoArraySchema,
  tollTripInfoSchema,
  getTollTripInfoParamsSchema,
} from "./tollTripInfo";

export {
  tollTripRatesSchema,
  tollTripRateSchema,
  getTollTripRatesParamsSchema,
} from "./tollTripRates";

export {
  tollTripVersionSchema,
  getTollTripVersionParamsSchema,
} from "./tollTripVersion";

export { getTripRatesByDateParamsSchema } from "./tripRatesByDate";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  TollRate,
  GetTollRatesParams,
} from "./tollRates";

export type {
  TollTripInfo,
  GetTollTripInfoParams,
} from "./tollTripInfo";

export type {
  TollTripRates,
  TollTripRate,
  GetTollTripRatesParams,
} from "./tollTripRates";

export type {
  TollTripVersion,
  GetTollTripVersionParams,
} from "./tollTripVersion";

export type { GetTripRatesByDateParams } from "./tripRatesByDate";
