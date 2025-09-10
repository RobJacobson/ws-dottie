export * from "./cacheFlushDate";
export * from "./fareLineItems";
export * from "./fareLineItemsBasic";
export * from "./fareLineItemsVerbose";
export * from "./faresTerminals";
export * from "./faresValidDateRange";
export * from "./fareTotals";
export * from "./terminalCombo";
export * from "./terminalComboVerbose";
export * from "./terminalMates";

// Re-export output types from schemas
export type {
  FareLineItem,
  FareLineItems,
  FareLineItemBasic,
  FareLineItemsBasic,
  LineItemXref,
  LineItem,
  RoundTripLineItem,
  FareLineItemsVerbose,
  FareTotal,
  FareTotals,
  FaresTerminal,
  FaresTerminals,
  TerminalCombo,
  TerminalComboVerboseItem,
  TerminalComboVerbose,
  TerminalMate,
  TerminalMates,
  ValidDateRange,
} from "@/schemas/wsf-fares";
