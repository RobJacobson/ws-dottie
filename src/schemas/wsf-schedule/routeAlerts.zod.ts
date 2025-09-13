import { z } from "zod";
import { routeAlertSchema } from "./routeAlert.zod";

/**
 * Array of route alerts.
 */
export const routeAlertsSchema = z
  .array(routeAlertSchema)
  .describe("Alerts associated with a route.");

export type RouteAlerts = z.infer<typeof routeAlertsSchema>;
