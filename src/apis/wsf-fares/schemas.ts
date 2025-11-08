/**
 * @fileoverview wsf-fares API - Zod Schema Exports
 *
 * This module provides exports for all Zod schemas used in the wsf-fares API.
 * Import these schemas when you need runtime validation in development or testing.
 */

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
export * from "./cacheFlushDate/cacheFlushDate.endpoints";
export * from "./fareLineItems/fareLineItems.input";
export * from "./fareLineItems/fareLineItems.output";
export * from "./fareTotals/fareTotals.input";
export * from "./fareTotals/fareTotals.output";
export * from "./terminalCombo/terminalCombo.input";
export * from "./terminalCombo/terminalCombo.output";
export * from "./validDateRange/validDateRange.input";
