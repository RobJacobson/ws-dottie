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
  getTollRatesParamsSchema,
  tollRateArraySchema,
  tollRateSchema,
} from "./tollRates";

export {
  getTollTripInfoParamsSchema,
  tollTripInfoArraySchema,
  tollTripInfoSchema,
} from "./tollTripInfo";

export {
  getTollTripRatesParamsSchema,
  tollTripRateSchema,
  tollTripRatesSchema,
} from "./tollTripRates";

export {
  getTollTripVersionParamsSchema,
  tollTripVersionSchema,
} from "./tollTripVersion";

export { getTripRatesByDateParamsSchema } from "./tripRatesByDate";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetTollRatesParams,
  TollRate,
} from "./tollRates";

export type {
  GetTollTripInfoParams,
  TollTripInfo,
} from "./tollTripInfo";

export type {
  GetTollTripRatesParams,
  TollTripRate,
  TollTripRates,
} from "./tollTripRates";

export type {
  GetTollTripVersionParams,
  TollTripVersion,
} from "./tollTripVersion";

export type { GetTripRatesByDateParams } from "./tripRatesByDate";
