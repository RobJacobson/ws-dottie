import { z } from "zod";
import { scheduleAlertSchema } from "./scheduleAlert.zod";

/**
 * ScheduleAlerts schema
 *
 * Array of schedule alerts.
 */
export const scheduleAlertsSchema = z
  .array(scheduleAlertSchema)
  .describe("Array of schedule alerts from WSF Schedule API.");

/** ScheduleAlerts type */
export type ScheduleAlerts = z.infer<typeof scheduleAlertsSchema>;
