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
export * from "./activeSeason.zod";

// ============================================================================
// ALERTS
// ============================================================================

export * from "./alert.zod";
export * from "./alertsResponse.zod";

// ============================================================================
// ANNOTATIONS & ADJUSTMENTS
// ============================================================================

export * from "./annotation.zod";
export * from "./contingencyAdjustment.zod";
export * from "./timeAdjustment.zod";
export * from "./timeAdjustmentByRoute.zod";
export * from "./timeAdjustmentByScheduledRoute.zod";
export * from "./timeAdjustmentResponse.zod";

// ============================================================================
// JOURNEYS & SAILINGS
// ============================================================================

export * from "./journey.zod"; // includes terminalTimeSchema
export * from "./sailing.zod";
export * from "./sailingResponse.zod";

// ============================================================================
// ROUTES
// ============================================================================

export * from "./route.zod";
export * from "./routeDetails.zod";
export * from "./routesWithServiceDisruptions.zod";
export * from "./scheduledRoute.zod";

// ============================================================================
// SCHEDULES
// ============================================================================

export * from "./scheduleResponse.zod";
export * from "./scheduleTerminalCombo.zod"; // includes scheduleTimeSchema
export * from "./scheduleTodayResponse.zod";

// ============================================================================
// SERVICE DISRUPTIONS
// ============================================================================

export * from "./serviceDisruption.zod";

// ============================================================================
// TERMINALS
// ============================================================================

export * from "./scheduleTerminal.zod";
export * from "./scheduleTerminalCombo.zod";
export * from "./terminalMatesByRoute.zod";
export * from "./terminalMatesForTerminal.zod";
export * from "./terminalsAndMates.zod";
export * from "./terminalsAndMatesByRoute.zod";

// ============================================================================
// VALID DATE RANGE
// ============================================================================

export * from "./validDateRange.zod";
