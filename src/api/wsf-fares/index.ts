/**
 * WSF Fares API - Complete Export Module
 *
 * This module provides access to Washington State Ferries fare data including
 * fare line items, terminal combinations, and pricing information.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getFareLineItems";
export * from "./getFareLineItemsBasic";
export * from "./getFareLineItemsVerbose";
export * from "./getFaresCacheFlushDate";
export * from "./getFaresTerminalMates";
export * from "./getFaresTerminals";
export * from "./getFaresValidDateRange";
export * from "./getFareTotals";
export * from "./getTerminalCombo";
export * from "./getTerminalComboVerbose";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  fareLineItemSchema,
  fareLineItemsArraySchema,
  getFareLineItemsParamsSchema,
} from "./getFareLineItems";
export {
  fareLineItemsBasicArraySchema,
  getFareLineItemsBasicParamsSchema,
} from "./getFareLineItemsBasic";
export {
  fareLineItemsVerboseResponseSchema,
  getFareLineItemsVerboseParamsSchema,
} from "./getFareLineItemsVerbose";
export { getFaresCacheFlushDateParamsSchema } from "./getFaresCacheFlushDate";
export {
  getFaresTerminalMatesParamsSchema,
  terminalMateSchema,
  terminalMatesArraySchema,
} from "./getFaresTerminalMates";
export {
  faresTerminalSchema,
  faresTerminalsArraySchema,
  getFaresTerminalsParamsSchema,
} from "./getFaresTerminals";
export { getFaresValidDateRangeParamsSchema } from "./getFaresValidDateRange";
export {
  fareTotalSchema,
  fareTotalsArraySchema,
  getFareTotalsParamsSchema,
} from "./getFareTotals";
export {
  getTerminalComboParamsSchema,
  terminalComboSchema,
} from "./getTerminalCombo";
export {
  getTerminalComboVerboseParamsSchema,
  terminalComboVerboseArraySchema,
  terminalComboVerboseSchema,
} from "./getTerminalComboVerbose";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  FareLineItem,
  GetFareLineItemsParams,
} from "./getFareLineItems";
export type { GetFareLineItemsBasicParams } from "./getFareLineItemsBasic";
export type { GetFareLineItemsVerboseParams } from "./getFareLineItemsVerbose";
export type { GetFaresCacheFlushDateParams } from "./getFaresCacheFlushDate";
export type {
  GetFaresTerminalMatesParams,
  TerminalMate,
} from "./getFaresTerminalMates";
export type {
  FaresTerminal,
  GetFaresTerminalsParams,
} from "./getFaresTerminals";
export type { GetFaresValidDateRangeParams } from "./getFaresValidDateRange";
export type { GetFareTotalsParams } from "./getFareTotals";
export type {
  GetTerminalComboParams,
  TerminalCombo,
} from "./getTerminalCombo";
export type {
  GetTerminalComboVerboseParams,
  TerminalComboVerbose,
} from "./getTerminalComboVerbose";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is now handled automatically via useQueryWithAutoUpdate
// No manual cache provider needed
