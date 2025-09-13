/**
 * @fileoverview WSF Schedule API Schemas
 *
 * This file re-exports all Zod schemas for the WSF Schedule API endpoints.
 * These schemas are used for validating API responses and providing
 * TypeScript types for the WSF Schedule functionality.
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/} WSF API Documentation
 */

// ============================================================================
// ACTIVE SEASONS & DATE RANGES
// ============================================================================

export * from "./activeDateRange.zod";
export * from "./activeDateRanges.zod";
export * from "./activeSeason.zod";
export * from "./activeSeasons.zod";

// ============================================================================
// ALERTS
// ============================================================================

export * from "./scheduleAlert.zod";
export * from "./scheduleAlerts.zod";
export * from "./alertsResponse.zod";
export * from "./alertsResponses.zod";

// ============================================================================
// ANNOTATIONS & ADJUSTMENTS
// ============================================================================

export * from "./annotation.zod";
export * from "./annotations.zod";
export * from "./contingencyAdjustment.zod";
export * from "./contingencyAdjustments.zod";
export * from "./timeAdjustment.zod";
export * from "./timeAdjustments.zod";
export * from "./timeAdjustmentByRoute.zod";
export * from "./timeAdjustmentByScheduledRoute.zod";
export * from "./timeAdjustmentsByScheduledRoutes.zod";

// ============================================================================
// JOURNEYS & SAILINGS
// ============================================================================

export * from "./journey.zod"; // includes terminalTimeSchema
export * from "./journeys.zod";
export * from "./sailing.zod";
export * from "./sailings.zod";
export * from "./sailingResponse.zod";
export * from "./sailingResponses.zod";

// ============================================================================
// ROUTES
// ============================================================================

export * from "./route.zod";
export * from "./routes.zod";
export * from "./routeAlert.zod";
export * from "./routeAlerts.zod";
export * from "./routeDetails.zod";
export * from "./routesWithServiceDisruptions.zod";
export * from "./scheduledRoute.zod";
export * from "./scheduledRoutes.zod";

// ============================================================================
// SCHEDULES
// ============================================================================

export * from "./scheduleResponse.zod";
export * from "./scheduleResponses.zod";
export * from "./scheduleTerminal.zod";
export * from "./scheduleTerminals.zod";
export * from "./scheduleTerminalCombo.zod";
export * from "./scheduleTerminalCombos.zod";
export * from "./scheduleTime.zod";
export * from "./scheduleTimes.zod";
export * from "./scheduleTodayResponse.zod";

// ============================================================================
// SERVICE DISRUPTIONS
// ============================================================================

export * from "./serviceDisruption.zod";
export * from "./serviceDisruptions.zod";

// ============================================================================
// TERMINALS
// ============================================================================

export * from "./terminalTime.zod";
export * from "./terminalTimes.zod";
export * from "./terminalMatesByRoute.zod";
export * from "./terminalMatesByRoutes.zod";
export * from "./terminalMatesForTerminal.zod";
export * from "./terminalMatesForTerminals.zod";
export * from "./terminalsAndMates.zod";
export * from "./terminalsAndMatesByRoute.zod";

// ============================================================================
// VALID DATE RANGE
// ============================================================================

export * from "../shared/validDateRange.zod";
