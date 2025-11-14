/**
 * @fileoverview wsf-schedule API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
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
export * from "./activeSeasons/activeSeasons.fetch";
export * from "./activeSeasons/activeSeasons.input";
export * from "./activeSeasons/activeSeasons.output";
export {
  type CacheFlushDateScheduleInput,
  type CacheFlushDateSchedules,
  cacheFlushDateSchedule,
} from "./cacheFlushDate/cacheFlushDate.endpoints";
export * from "./cacheFlushDate/cacheFlushDate.fetch";
export * from "./routeDetails/routeDetails.fetch";
export * from "./routeDetails/routeDetails.input";
export * from "./routeDetails/routeDetails.output";
export * from "./routes/routes.fetch";
export * from "./routes/routes.input";
export * from "./routes/routes.output";
export * from "./sailings/sailings.fetch";
export * from "./sailings/sailings.input";
export * from "./sailings/sailings.output";
export * from "./scheduleAlerts/scheduleAlerts.fetch";
export * from "./scheduleAlerts/scheduleAlerts.input";
export * from "./scheduleAlerts/scheduleAlerts.output";
export * from "./scheduledRoutes/scheduledRoutes.fetch";
export * from "./scheduledRoutes/scheduledRoutes.input";
export * from "./scheduledRoutes/scheduledRoutes.output";
export * from "./schedules/schedules.fetch";
export * from "./schedules/schedules.input";
export * from "./schedules/schedules.output";
export * from "./scheduleToday/scheduleToday.fetch";
export * from "./scheduleToday/scheduleToday.input";
export * from "./scheduleToday/scheduleToday.output";
export * from "./serviceDisruptions/serviceDisruptions.fetch";
export * from "./serviceDisruptions/serviceDisruptions.input";
export * from "./serviceDisruptions/serviceDisruptions.output";
export * from "./terminalMates/terminalMates.fetch";
export * from "./terminals/terminals.fetch";
export * from "./terminals/terminals.input";
export * from "./terminals/terminals.output";
export * from "./timeAdjustments/timeAdjustments.fetch";
export * from "./timeAdjustments/timeAdjustments.input";
export * from "./timeAdjustments/timeAdjustments.output";
export * from "./validDateRange/validDateRange.fetch";
export * from "./validDateRange/validDateRange.input";
