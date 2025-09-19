/**
 * @fileoverview WSF Schedule API Schemas
 *
 * This file re-exports all Zod schemas for the WSF Schedule API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSF Schedule functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/} WSF API Documentation
 */

export * from "./activeDateRange.zod";
export * from "./alert.zod";
export * from "./annotation.zod";
export * from "./contingencyAdjustment.zod";
export * from "./journey.zod"; // includes terminalTimeSchema
export * from "./routeAlert.zod";
export * from "./routeBriefAlert.zod";
export * from "./routeBriefResponse.zod";
export * from "./routeDetails.zod";
export * from "./sailing.zod";
export * from "./sailingResponse.zod";
export * from "./scheduleAlert.zod";
export * from "./scheduleBriefResponse";
// export * from "./routes.zod";
export * from "./scheduledRoute.zod";
export * from "./scheduleResponse.zod";
export * from "./scheduleTerminal.zod";
export * from "./scheduleTerminalCombo.zod";
export * from "./scheduleTime.zod";
export * from "./scheduleTodayResponse.zod";
// export * from "./serviceDisruptions.zod";
export * from "./terminalMatesByRoute.zod";
export * from "./terminalMatesForTerminal.zod";
export * from "./terminalsAndMates.zod";
export * from "./terminalsAndMatesByRoute.zod";
export * from "./terminalTime.zod";
export * from "./timeAdjustment.zod";
export * from "./timeAdjustmentByRoute.zod";
export * from "./timeAdjustmentByScheduledRoute.zod";
export * from "../shared/validDateRange.zod";
