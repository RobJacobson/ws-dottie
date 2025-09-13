import { z } from "zod";
import { timeAdjustmentByScheduledRouteSchema } from "./timeAdjustmentByScheduledRoute.zod";

/**
 * TimeAdjustmentsByScheduledRoutes schema
 *
 * Array of time adjustments by scheduled route.
 */
export const timeAdjustmentsByScheduledRoutesSchema = z
  .array(timeAdjustmentByScheduledRouteSchema)
  .describe(
    "All additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the /sailings resultset."
  );

/** TimeAdjustmentsByScheduledRoutes type */
export type TimeAdjustmentsByScheduledRoutes = z.infer<
  typeof timeAdjustmentsByScheduledRoutesSchema
>;
