import { defineEndpoint } from "@/shared/endpoints";
import { getFaresCacheFlushDateMeta } from "./cacheFlushDate";
import { getFareLineItemsMeta } from "./fareLineItems";
import { getFareLineItemsBasicMeta } from "./fareLineItemsBasic";
import { getFareLineItemsVerboseMeta } from "./fareLineItemsVerbose";
import { getFaresTerminalsMeta } from "./faresTerminals";
import { getFaresValidDateRangeMeta } from "./faresValidDateRange";
import { getFareTotalsMeta } from "./fareTotals";
import { getFaresTerminalComboMeta } from "./terminalCombo";
import { getTerminalComboVerboseMeta } from "./terminalComboVerbose";
import { getFaresTerminalMatesMeta } from "./terminalMates";

export const getFaresCacheFlushDate = defineEndpoint(
  getFaresCacheFlushDateMeta
);
export const fareLineItems = defineEndpoint(getFareLineItemsMeta);
export const fareLineItemsBasic = defineEndpoint(getFareLineItemsBasicMeta);
export const fareLineItemsVerbose = defineEndpoint(getFareLineItemsVerboseMeta);
export const fareTotals = defineEndpoint(getFareTotalsMeta);
export const faresTerminals = defineEndpoint(getFaresTerminalsMeta);
export const faresValidDateRange = defineEndpoint(getFaresValidDateRangeMeta);
export const getFaresTerminalCombo = defineEndpoint(getFaresTerminalComboMeta);
export const getFaresTerminalComboVerbose = defineEndpoint(
  getTerminalComboVerboseMeta
);
export const getFaresTerminalMates = defineEndpoint(getFaresTerminalMatesMeta);

// Re-export output types from schemas
export type {
  FareLineItem,
  FareLineItemBasic,
  FareLineItems,
  FareLineItemsBasic,
  FareLineItemsVerbose,
  FaresTerminal,
  FaresTerminals,
  FareTotal,
  FareTotals,
  LineItem,
  LineItemXref,
  RoundTripLineItem,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalComboVerboseItem,
  TerminalMate,
  TerminalMates,
} from "@/schemas/wsf-fares";
// Re-export input types from client files
export type { FaresCacheFlushDateInput } from "./cacheFlushDate";
export type { FareLineItemsInput } from "./fareLineItems";
export type { FareLineItemsBasicInput } from "./fareLineItemsBasic";
export type { FareLineItemsVerboseInput } from "./fareLineItemsVerbose";
export type { FaresTerminalsInput } from "./faresTerminals";
export type { FaresValidDateRangeInput } from "./faresValidDateRange";
export type { FareTotalsInput } from "./fareTotals";
export type { FaresTerminalComboInput } from "./terminalCombo";
export type { FaresTerminalComboVerboseInput } from "./terminalComboVerbose";
export type { FaresTerminalMatesInput } from "./terminalMates";
