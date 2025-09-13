import { z } from "zod";
import { type Alert, alertsSchema } from "@/schemas/wsf-schedule/alert.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getAlerts */
const scheduleAlertsInput = z.object({});

/** Endpoint metadata for getAlerts */
export const getScheduleAlertsMeta: Endpoint<ScheduleAlertsInput, Alert[]> = {
  endpoint: "/ferries/api/schedule/rest/alerts",
  inputSchema: scheduleAlertsInput,
  outputSchema: alertsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleAlertsInput = z.infer<typeof scheduleAlertsInput>;
