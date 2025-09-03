// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export {
  getFaresCacheFlushDate,
  useFaresCacheFlushDate,
} from "../../shared/caching/cacheFlushDate";
export {
  getFareLineItems,
  getFareLineItemsBasic,
  fareLineItemsOptions,
  fareLineItemsBasicOptions,
} from "./fareLineItems";
export {
  getFareLineItemsVerbose,
  fareLineItemsVerboseOptions,
} from "./fareLineItemsVerbose";
export {
  getFaresTerminals,
  getFaresTerminalMates,
  faresTerminalsOptions,
  faresTerminalMatesOptions,
} from "./faresTerminals";
export {
  getFaresValidDateRange,
  faresValidDateRangeOptions,
} from "./faresValidDateRange";
export { getFareTotals, fareTotalsOptions } from "./fareTotals";
export {
  getTerminalCombo,
  getTerminalComboVerbose,
  terminalComboOptions,
  terminalComboVerboseOptions,
} from "./terminalCombo";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export { wsfCacheFlushDateParamsSchema as getFaresCacheFlushDateParamsSchema } from "../../shared/caching/cacheFlushDate";
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

export type { WsfCacheFlushDateParams as GetFaresCacheFlushDateParams } from "../../shared/caching/cacheFlushDate";
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
