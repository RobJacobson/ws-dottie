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
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetFareLineItemsParams } from "./getFareLineItems";
export type {
  FareLineItem,
  GetFareLineItemsBasicParams,
} from "./getFareLineItemsBasic";
export type {
  FareLineItemsVerboseResponse,
  GetFareLineItemsVerboseParams,
  LineItemLookup,
} from "./getFareLineItemsVerbose";
export type { GetFaresCacheFlushDateParams } from "./getFaresCacheFlushDate";
export type {
  GetFaresTerminalMatesParams,
  TerminalMate,
} from "./getFaresTerminalMates";
export type {
  FaresTerminal,
  GetFaresTerminalsParams,
} from "./getFaresTerminals";
export type {
  FaresValidDateRange,
  GetFaresValidDateRangeParams,
} from "./getFaresValidDateRange";
export type {
  FareTotal,
  GetFareTotalsParams,
} from "./getFareTotals";
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

export * from "./cache";
