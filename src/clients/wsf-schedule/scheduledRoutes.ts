import {
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
  type ScheduledRoute,
  type ScheduledRoutesArray,
} from "@/schemas/wsf-schedule";
import {
  contingencyAdjustmentSchema,
  type ContingencyAdjustment,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Output Schemas & Types
//
// contingencyAdjustmentSchema (imported from contingencyAdjustment.zod)
// scheduledRouteSchema (imported from scheduledRoute.zod)
// scheduledRoutesArraySchema (imported from scheduledRoute.zod)
// ScheduledRoute (imported from scheduledRoute.zod)
// ============================================================================

// Re-export schemas and types for convenience
export {
  contingencyAdjustmentSchema,
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
};
export type { ContingencyAdjustment, ScheduledRoute };
export type ScheduledRoutes = ScheduledRoutesArray;
