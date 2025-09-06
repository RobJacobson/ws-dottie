import {
  type ContingencyAdjustment,
  contingencyAdjustmentSchema,
  type ScheduledRoute,
  type ScheduledRoutesArray,
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
} from "@/schemas/wsf-schedule";

export {
  contingencyAdjustmentSchema,
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
};
export type { ContingencyAdjustment, ScheduledRoute };
export type ScheduledRoutes = ScheduledRoutesArray;
