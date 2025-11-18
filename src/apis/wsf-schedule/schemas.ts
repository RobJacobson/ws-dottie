/**
 * @fileoverview wsf-schedule API - Zod Schema Exports
 *
 * This module provides exports for all Zod schemas used in the wsf-schedule API.
 * Import these schemas when you need runtime validation in development or testing.
 */

export type {
  CacheFlushDateInput as CacheFlushDateScheduleInput,
  CacheFlushDateOutput as CacheFlushDateSchedules,
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
export * from "./activeSeasons/shared/activeSeasons.input";
export * from "./activeSeasons/shared/activeSeasons.output";
export * from "./routeDetails/shared/routeDetails.input";
export * from "./routeDetails/shared/routeDetails.output";
export * from "./routes/shared/routes.input";
export * from "./routes/shared/routes.output";
export * from "./sailings/shared/sailings.input";
export * from "./sailings/shared/sailings.output";
export * from "./scheduleAlerts/shared/scheduleAlerts.input";
export * from "./scheduleAlerts/shared/scheduleAlerts.output";
export * from "./scheduledRoutes/shared/scheduledRoutes.input";
export * from "./scheduledRoutes/shared/scheduledRoutes.output";
export * from "./schedules/shared/schedules.input";
export * from "./schedules/shared/schedules.output";
export * from "./scheduleToday/shared/scheduleToday.input";
export * from "./scheduleToday/shared/scheduleToday.output";
export * from "./serviceDisruptions/shared/serviceDisruptions.input";
export * from "./serviceDisruptions/shared/serviceDisruptions.output";
export * from "./terminals/shared/terminals.input";
export * from "./terminals/shared/terminals.output";
export * from "./timeAdjustments/shared/timeAdjustments.input";
export * from "./timeAdjustments/shared/timeAdjustments.output";
export * from "./validDateRange/shared/validDateRange.input";
