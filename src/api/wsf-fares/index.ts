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
