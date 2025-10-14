/**
 * @fileoverview WSF Fares API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Fares API, exporting
 * all input/output types, the main API definition, and individual resources.
 */

// Export the main API definition
// Export individual resources for direct use
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
