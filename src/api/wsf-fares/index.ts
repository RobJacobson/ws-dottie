// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export {
  getFaresCacheFlushDate,
  useFaresCacheFlushDate,
} from "../wsf/cacheFlushDate";
export * from "./fareLineItems";
export * from "./fareLineItemsVerbose";
export * from "./faresTerminals";
export * from "./faresValidDateRange";
export * from "./fareTotals";
export * from "./terminalCombo";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export { wsfCacheFlushDateParamsSchema as getFaresCacheFlushDateParamsSchema } from "../wsf/cacheFlushDate";
export {
  fareLineItemSchema,
  fareLineItemsArraySchema,
  fareLineItemsBasicArraySchema,
  getFareLineItemsBasicParamsSchema,
  getFareLineItemsParamsSchema,
} from "./fareLineItems";
export {
  fareLineItemsVerboseResponseSchema,
  getFareLineItemsVerboseParamsSchema,
} from "./fareLineItemsVerbose";
export {
  faresTerminalSchema,
  faresTerminalsArraySchema,
  getFaresTerminalMatesParamsSchema,
  getFaresTerminalsParamsSchema,
  terminalMateSchema,
  terminalMatesArraySchema,
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

export type { WsfCacheFlushDateParams as GetFaresCacheFlushDateParams } from "../wsf/cacheFlushDate";
export type {
  FareLineItem,
  GetFareLineItemsBasicParams,
  GetFareLineItemsParams,
} from "./fareLineItems";
export type { GetFareLineItemsVerboseParams } from "./fareLineItemsVerbose";
export type {
  FaresTerminal,
  GetFaresTerminalMatesParams,
  GetFaresTerminalsParams,
  TerminalMate,
} from "./faresTerminals";
export type { GetFaresValidDateRangeParams } from "./faresValidDateRange";
export type { GetFareTotalsParams } from "./fareTotals";
export type {
  GetTerminalComboParams,
  GetTerminalComboVerboseParams,
  TerminalCombo,
  TerminalComboVerbose,
} from "./terminalCombo";
