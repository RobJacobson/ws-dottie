import { z } from "zod";
import {
  type Alert,
  type AlertsArray,
  alertSchema,
  alertsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleAlertsParamsSchema = z.object({});

export type GetScheduleAlertsParams = z.infer<
  typeof getScheduleAlertsParamsSchema
>;

export { alertSchema, alertsArraySchema };
export type ScheduleAlert = Alert;
export type ScheduleAlerts = AlertsArray;

export const getScheduleAlerts = async (
  params: GetScheduleAlertsParams
): Promise<ScheduleAlerts> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/alerts",
    inputSchema: getScheduleAlertsParamsSchema,
    outputSchema: alertsArraySchema,
    params,
  });

export const scheduleAlertsOptions = createQueryOptions({
  apiFunction: getScheduleAlerts,
  queryKey: ["wsf", "schedule", "alerts", "getScheduleAlerts"],
  cacheStrategy: "DAILY_STATIC",
});
