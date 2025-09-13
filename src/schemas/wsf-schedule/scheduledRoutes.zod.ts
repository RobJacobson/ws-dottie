import { z } from "zod";
import { scheduledRouteSchema } from "./scheduledRoute.zod";

/**
 * Array of scheduled routes.
 */
export const scheduledRoutesSchema = z
  .array(scheduledRouteSchema)
  .describe("The routes that are active for a season.");

export type ScheduledRoutes = z.infer<typeof scheduledRoutesSchema>;
