// WSF Fares API exports
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html

// API functions
export {
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsVerbose,
  getFaresCacheFlushDate,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotals,
  getTerminalCombo,
  getTerminalComboVerbose,
} from "./api";
// Input parameter types
export type {
  GetFareLineItemsBasicParams,
  GetFareLineItemsParams,
  GetFareLineItemsVerboseParams,
  GetFaresCacheFlushDateParams,
  GetFaresTerminalMatesParams,
  GetFaresTerminalsParams,
  GetFaresValidDateRangeParams,
  GetFareTotalsParams,
  GetTerminalComboParams,
  GetTerminalComboVerboseParams,
} from "./inputs";
// Export types
export type {
  FareLineItem,
  FareLineItemBasic,
  FareLineItemsVerboseResponse,
  FareLineItemVerbose,
  FaresCacheFlushDate,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  LineItemLookup,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalMate,
} from "./outputs";
