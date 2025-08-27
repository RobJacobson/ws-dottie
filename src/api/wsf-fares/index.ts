/**
 * WSF Fares API - Complete Export Module
 *
 * This module provides access to Washington State Ferries fare data including
 * fare line items, terminal combinations, and pricing information. The WSF Fares
 * API enables applications to retrieve fare structures, calculate total costs,
 * and provide comprehensive pricing information for ferry journeys.
 *
 * API Functions:
 * - getFareLineItems: Complete fare catalog for specific routes
 * - getFareLineItemsBasic: Most popular fares for specific routes
 * - getFareLineItemsVerbose: Comprehensive fare data for all routes
 * - getFaresTerminals: Valid departing terminals for fare queries
 * - getFaresTerminalMates: Valid arriving terminals for departing terminals
 * - getFaresValidDateRange: Valid date range for fare data
 * - getFareTotals: Fare calculation for specific fare combinations
 * - getTerminalCombo: Terminal combination information for specific routes
 * - getTerminalComboVerbose: All terminal combinations for a date
 *
 * Input/Output Overview:
 * - Most endpoints require tripDate parameter (JavaScript Date object)
 * - Route-specific endpoints require departingTerminalID and arrivingTerminalID
 * - Fare calculation endpoints require fare line item IDs and quantities
 * - All endpoints return structured data with consistent field naming
 *
 * Base Types: FareLineItem, FaresTerminal, TerminalMate, FareTotal, TerminalCombo
 *
 * Example Usage:
 *
 * # Get valid date range
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/validdaterange?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * # Get fare line items for Seattle to Bainbridge Island
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/farelineitems/2025-08-26/7/3/false?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Note: All endpoints require a valid WSDOT API access code. Dates must be within
 * the valid range returned by getFaresValidDateRange. Terminal IDs are consistent
 * across the WSF system and can be used in other API endpoints.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./fareLineItems";
export * from "./fareLineItemsVerbose";
export {
  getFaresCacheFlushDate,
  useFaresCacheFlushDate,
} from "../wsf/cacheFlushDate";
export * from "./faresTerminals";
export * from "./faresValidDateRange";
export * from "./fareTotals";
export * from "./terminalCombo";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  fareLineItemSchema,
  fareLineItemsArraySchema,
  fareLineItemsBasicArraySchema,
  getFareLineItemsParamsSchema,
  getFareLineItemsBasicParamsSchema,
} from "./fareLineItems";
export {
  fareLineItemsVerboseResponseSchema,
  getFareLineItemsVerboseParamsSchema,
} from "./fareLineItemsVerbose";
export { wsfCacheFlushDateParamsSchema as getFaresCacheFlushDateParamsSchema } from "../wsf/cacheFlushDate";
export {
  getFaresTerminalMatesParamsSchema,
  terminalMateSchema,
  terminalMatesArraySchema,
  faresTerminalSchema,
  faresTerminalsArraySchema,
  getFaresTerminalsParamsSchema,
} from "./faresTerminals";
export { getFaresValidDateRangeParamsSchema } from "./faresValidDateRange";
export {
  fareTotalSchema,
  fareTotalsArraySchema,
  getFareTotalsParamsSchema,
} from "./fareTotals";
export {
  getTerminalComboParamsSchema,
  getTerminalComboVerboseParamsSchema,
  terminalComboSchema,
  terminalComboVerboseArraySchema,
  terminalComboVerboseSchema,
} from "./terminalCombo";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  FareLineItem,
  GetFareLineItemsParams,
  GetFareLineItemsBasicParams,
} from "./fareLineItems";
export type { GetFareLineItemsVerboseParams } from "./fareLineItemsVerbose";
export type { WsfCacheFlushDateParams as GetFaresCacheFlushDateParams } from "../wsf/cacheFlushDate";
export type {
  GetFaresTerminalMatesParams,
  TerminalMate,
  FaresTerminal,
  GetFaresTerminalsParams,
} from "./faresTerminals";
export type { GetFaresValidDateRangeParams } from "./faresValidDateRange";
export type { GetFareTotalsParams } from "./fareTotals";
export type {
  GetTerminalComboParams,
  GetTerminalComboVerboseParams,
  TerminalCombo,
  TerminalComboVerbose,
} from "./terminalCombo";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is now handled automatically via useQueryWithAutoUpdate
// No manual cache provider needed
