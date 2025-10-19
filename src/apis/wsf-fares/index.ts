/**
 * @fileoverview WSF Fares API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Fares API, exporting
 * all input/output types, the main API definition, and individual resources.
 */

// Export the main API definition and individual resources for direct use
export {
  cacheFlushDateResource,
  fareLineItemsResource,
  fareTotalsResource,
  terminalComboResource,
  terminalsResource,
  validDateRangeResource,
  wsfFaresApi,
} from "./endpoints";

// Export all input types
export type {
  FareLineItemsBasicInput,
  FareLineItemsInput,
  FareLineItemsVerboseInput,
} from "./fareLineItems/fareLineItems.input";
export type { FaresCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
export type { FareTotalsInput } from "./fareTotals/fareTotals.input";
export type {
  TerminalComboInput,
  TerminalComboVerboseInput,
} from "./terminalCombo/terminalCombo.input";
export type {
  TerminalMatesInput,
  TerminalsInput,
} from "./terminals/terminals.input";
export type { ValidDateRangeInput } from "./validDateRange/validDateRange.input";

// Export all output types
export type { FaresCacheFlushDateResponse } from "./cacheFlushDate/cacheFlushDate.output";
export type {
  FareTotalResponse,
  FareTotalType,
} from "./fareTotals/fareTotals.output";
export type {
  LineItemResponse,
  LineItemVerboseResponse,
  LineItemXref,
} from "./fareLineItems/fareLineItems.output";
export type {
  TerminalComboResponse,
  TerminalComboVerboseResponse,
} from "./terminalCombo/terminalCombo.output";
export type {
  TerminalBase,
  TerminalResponse,
} from "./terminals/terminals.output";
export type { ValidDateRangeResponse } from "./validDateRange/validDateRange.output";
