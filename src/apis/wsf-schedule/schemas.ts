/**
 * @fileoverview wsf-schedule API - Zod Schema Exports
 *
 * This module provides exports for all Zod schemas used in the wsf-schedule API.
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
export * from "./activeSeasons/activeSeasons.input";
export * from "./activeSeasons/activeSeasons.output";
export * from "./cacheFlushDate/cacheFlushDate.endpoints";
export * from "./routeDetails/routeDetails.input";
export * from "./routeDetails/routeDetails.output";
export * from "./routes/routes.input";
export * from "./routes/routes.output";
export * from "./sailings/sailings.input";
export * from "./sailings/sailings.output";
export * from "./scheduleAlerts/scheduleAlerts.input";
export * from "./scheduleAlerts/scheduleAlerts.output";
export * from "./scheduledRoutes/scheduledRoutes.input";
export * from "./scheduledRoutes/scheduledRoutes.output";
export * from "./schedules/schedules.input";
export * from "./schedules/schedules.output";
export * from "./scheduleToday/scheduleToday.input";
export * from "./scheduleToday/scheduleToday.output";
export * from "./serviceDisruptions/serviceDisruptions.input";
export * from "./serviceDisruptions/serviceDisruptions.output";
export * from "./terminals/terminals.input";
export * from "./terminals/terminals.output";
export * from "./timeAdjustments/timeAdjustments.input";
export * from "./timeAdjustments/timeAdjustments.output";
export * from "./validDateRange/validDateRange.input";
