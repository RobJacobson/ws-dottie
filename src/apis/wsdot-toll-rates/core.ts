/**
 * @fileoverview wsdot-toll-rates API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./tollRates/shared/tollRates.input";
export * from "./tollRates/shared/tollRates.output";
// Toll Rates
export { fetchTollRates } from "./tollRates/tollRates";
export * from "./tollTripInfo/shared/tollTripInfo.input";
export * from "./tollTripInfo/shared/tollTripInfo.output";
// Toll Trip Info
export { fetchTollTripInfo } from "./tollTripInfo/tollTripInfo";
export * from "./tollTripRates/shared/tollTripRates.input";
export * from "./tollTripRates/shared/tollTripRates.output";
// Toll Trip Rates
export { fetchTripRatesByDate } from "./tollTripRates/tripRatesByDate";
export { fetchTollTripRates } from "./tollTripRates/tollTripRates";
export { fetchTripRatesByVersion } from "./tollTripRates/tripRatesByVersion";
export * from "./tollTripVersion/shared/tollTripVersion.input";
export * from "./tollTripVersion/shared/tollTripVersion.output";
// Toll Trip Version
export { fetchTollTripVersion } from "./tollTripVersion/tollTripVersion";
