/**
 * @fileoverview wsf-fares API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export {
  CacheFlushDateInput as CacheFlushDateFaresInput,
  CacheFlushDateOutput as CacheFlushDateFares,
} from "@/apis/shared/cacheFlushDate";
export {
  type TerminalMatesInput,
  type TerminalsInput,
  terminalMatesInputSchema,
  terminalsInputSchema,
} from "../shared/terminals.input";
export {
  type Terminal,
  type TerminalList,
  terminalListSchema,
  terminalSchema,
} from "../shared/terminals.output";
export {
  type ValidDateRange,
  validDateRangeSchema,
} from "../shared/validDateRange.output";
export { fetchCacheFlushDateFares } from "./cacheFlushDate/cacheFlushDateFares";
export { fetchFareLineItemsBasic } from "./fareLineItems/fareLineItemsBasic";
export { fetchFareLineItemsByTripDateAndTerminals } from "./fareLineItems/fareLineItemsByTripDateAndTerminals";
export { fetchFareLineItemsVerbose } from "./fareLineItems/fareLineItemsVerbose";
export * from "./fareLineItems/shared/fareLineItems.input";
export * from "./fareLineItems/shared/fareLineItems.output";
export { fetchFareTotalsByTripDateAndRoute } from "./fareTotals/fareTotalsByTripDateAndRoute";
export * from "./fareTotals/shared/fareTotals.input";
export * from "./fareTotals/shared/fareTotals.output";
export * from "./terminalCombo/shared/terminalCombo.input";
export * from "./terminalCombo/shared/terminalCombo.output";
export { fetchTerminalComboFares } from "./terminalCombo/terminalComboFares";
export { fetchTerminalComboFaresVerbose } from "./terminalCombo/terminalComboFaresVerbose";
export { fetchTerminalFares } from "./terminals/terminalFares";
export { fetchTerminalMatesFares } from "./terminals/terminalMatesFares";
export { fetchFaresValidDateRange } from "./validDateRange/faresValidDateRange";
export * from "./validDateRange/shared/validDateRange.input";
