/**
 * WSF Fares API - Complete Export Module
 *
 * This module provides access to Washington State Ferries fare data including
 * fare line items, terminal combinations, and pricing information.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./fareLineItems";
export * from "./getFareLineItemsVerbose";
export * from "./getFaresCacheFlushDate";
export * from "./faresTerminals";
export * from "./getFaresValidDateRange";
export * from "./getFareTotals";
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
} from "./getFareLineItemsVerbose";
export { getFaresCacheFlushDateParamsSchema } from "./getFaresCacheFlushDate";
export {
  getFaresTerminalMatesParamsSchema,
  terminalMateSchema,
  terminalMatesArraySchema,
  faresTerminalSchema,
  faresTerminalsArraySchema,
  getFaresTerminalsParamsSchema,
} from "./faresTerminals";
export { getFaresValidDateRangeParamsSchema } from "./getFaresValidDateRange";
export {
  fareTotalSchema,
  fareTotalsArraySchema,
  getFareTotalsParamsSchema,
} from "./getFareTotals";
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
export type { GetFareLineItemsVerboseParams } from "./getFareLineItemsVerbose";
export type { GetFaresCacheFlushDateParams } from "./getFaresCacheFlushDate";
export type {
  GetFaresTerminalMatesParams,
  TerminalMate,
  FaresTerminal,
  GetFaresTerminalsParams,
} from "./faresTerminals";
export type { GetFaresValidDateRangeParams } from "./getFaresValidDateRange";
export type { GetFareTotalsParams } from "./getFareTotals";
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
