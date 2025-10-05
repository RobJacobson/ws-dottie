/**
 * @fileoverview WSF Fares API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Fares API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsfFaresApi } from "./endpoints";
// Export all input types
export type {
  FareLineItemsBasicInput,
  FareLineItemsInput,
  FareLineItemsVerboseInput,
  FaresCacheFlushDateInput,
  FareTotalsInput,
  TerminalComboInput,
  TerminalComboVerboseInput,
  TerminalMatesInput,
  TerminalsInput,
  ValidDateRangeInput,
} from "./original/inputSchemas.original";
// Export all output types
export type {
  FaresCacheFlushDateResponse,
  FareTotalResponse,
  LineItemResponse,
  LineItemVerboseResponse,
  TerminalComboResponse,
  TerminalComboVerboseResponse,
  TerminalResponse,
  ValidDateRangeResponse,
} from "./original/outputSchemas.original";
