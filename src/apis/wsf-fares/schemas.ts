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
export * from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
export * from "./fareLineItems/shared/fareLineItems.input";
export * from "./fareLineItems/shared/fareLineItems.output";
export * from "./fareTotals/shared/fareTotals.input";
export * from "./fareTotals/shared/fareTotals.output";
export * from "./terminalCombo/shared/terminalCombo.input";
export * from "./terminalCombo/shared/terminalCombo.output";
export * from "./validDateRange/shared/validDateRange.input";
