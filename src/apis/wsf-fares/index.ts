/**
 * @fileoverview WSF Fares API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSF Fares API, exporting
 * all input/output types, core functions, and React hooks.
 */

export type { FaresCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
// Export all output types
export type { FaresCacheFlushDateResponse } from "./cacheFlushDate/cacheFlushDate.output";
// Export all core functions
export {
  getFareLineItemsBasic,
  getFareLineItemsByTripDateAndTerminals,
  getFareLineItemsVerbose,
  getFaresCacheFlushDate,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotalsByTripDateAndRoute,
  getTerminalCombo,
  getTerminalMates,
} from "./core";
// Export all input types
export type {
  FareLineItemsBasicInput,
  FareLineItemsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems/fareLineItems.input";
export type {
  LineItemResponse,
  LineItemVerboseResponse,
  LineItemXref,
} from "./fareLineItems/fareLineItems.output";
export type { FareTotalsInput } from "./fareTotals/fareTotals.input";
export type {
  FareTotalResponse,
  FareTotalType,
} from "./fareTotals/fareTotals.output";
// Export all React hooks
export {
  useGetFareLineItemsBasic,
  useGetFareLineItemsByTripDateAndTerminals,
  useGetFareLineItemsVerbose,
  useGetFaresTerminals,
  useGetFaresValidDateRange,
  useGetFareTotalsByTripDateAndRoute,
  useGetTerminalCombo,
  useGetTerminalComboVerbose,
  useGetTerminalMates,
} from "./hooks";
export type {
  TerminalComboInput,
  TerminalComboVerboseInput,
} from "./terminalCombo/terminalCombo.input";
export type {
  TerminalComboResponse,
  TerminalComboVerboseResponse,
} from "./terminalCombo/terminalCombo.output";
export type {
  TerminalMatesInput,
  TerminalsInput,
} from "./terminals/terminals.input";
export type {
  TerminalBase,
  TerminalResponse,
} from "./terminals/terminals.output";
export type { ValidDateRangeInput } from "./validDateRange/validDateRange.input";
export type { ValidDateRangeResponse } from "./validDateRange/validDateRange.output";
