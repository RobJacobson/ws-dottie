import { z } from "zod";
import {
  type Alert,
  type AlertsArray,
  alertSchema,
  alertsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getAlertsParamsSchema = z.object({});

export type GetAlertsParams = z.infer<typeof getAlertsParamsSchema>;

export { alertSchema, alertsArraySchema };
export type ScheduleAlert = Alert;
export type ScheduleAlerts = AlertsArray;

export const getAlerts = zodFetch<GetAlertsParams, ScheduleAlerts>(
  "/ferries/api/schedule/rest/alerts",
  getAlertsParamsSchema,
  alertsArraySchema
);

export const alertsOptions = createQueryOptions({
  apiFunction: getAlerts,
  queryKey: ["wsf", "schedule", "alerts", "getAlerts"],
  cacheStrategy: "DAILY_STATIC",
});
