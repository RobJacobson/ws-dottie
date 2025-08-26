/**
 * WSDOT Toll Rates API - Complete Export Module
 *
 * Comprehensive access to Washington State Department of Transportation toll rate data
 * including current rates, trip information, historical data, and version tracking.
 *
 * This module provides a complete interface to WSDOT's tolling system APIs, offering
 * real-time toll rate data, trip information with geometry, historical pricing data,
 * and version management for toll rate updates. The APIs cover managed lanes and
 * toll facilities across Washington State including SR-520, SR-167, and SR-405.
 *
 * API Functions:
 * - getTollRates: Returns current toll rates for all active toll facilities
 * - getTollTripInfo: Returns toll trip information with geometry data
 * - getTollTripRates: Returns toll trip rates with messages and version information
 * - getTollTripVersion: Returns current version number for toll rate data
 * - getTripRatesByDate: Returns historical toll rates for specified date range
 *
 * Input/Output Overview:
 * - getTollRates: Input: none, Output: TollRate[]
 * - getTollTripInfo: Input: none, Output: TollTripInfo[]
 * - getTollTripRates: Input: none, Output: TollTripRates
 * - getTollTripVersion: Input: none, Output: TollTripVersion
 * - getTripRatesByDate: Input: { fromDate: Date, toDate: Date }, Output: TollRate[]
 *
 * Base Types:
 *
 * interface TollRate {
 *   CurrentToll: number;
 *   EndLocationName: string | null;
 *   EndMilepost: number;
 *   StartLocationName: string | null;
 *   StartMilepost: number;
 *   StateRoute: string | null;
 *   TravelDirection: string | null;
 *   TripName: string | null;
 * }
 *
 * interface TollTripInfo {
 *   EndLocationName: string | null;
 *   EndMilepost: number;
 *   Geometry: string;
 *   ModifiedDate: Date | null;
 *   StartLocationName: string | null;
 *   StartMilepost: number;
 *   TravelDirection: string | null;
 *   TripName: string | null;
 * }
 *
 * interface TollTripRates {
 *   Trips: TollTripRate[];
 *   Version: number;
 * }
 *
 * interface TollTripRate {
 *   Message: string;
 *   Toll: number;
 *   TripName: string;
 * }
 *
 * interface TollTripVersion {
 *   Version: number;
 * }
 *
 * interface GetTripRatesByDateParams {
 *   fromDate: Date;
 *   toDate: Date;
 * }
 *
 * Note: Some endpoints may return errors with demo access tokens. The actual API response
 * structure should be verified with valid access tokens when available. The GetTollRatesAsJson
 * endpoint includes additional fields not documented in official WSDOT documentation.
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?AccessCode=$WSDOT_ACCESS_TOKEN&fromDate=2024-01-01&toDate=2024-01-02"
 */

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
