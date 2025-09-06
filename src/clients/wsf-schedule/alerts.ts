import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  alertSchema,
  alertsArraySchema,
  type Alert,
  type AlertsArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getAlertsParamsSchema
// GetAlertsParams
// ============================================================================

export const getAlertsParamsSchema = z.object({});

export type GetAlertsParams = z.infer<typeof getAlertsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// alertSchema (imported from alert.zod)
// alertsArraySchema (imported from alert.zod)
// Alert (imported from alert.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { alertSchema, alertsArraySchema };
export type ScheduleAlert = Alert;
export type ScheduleAlerts = AlertsArray;

// ============================================================================
// API Functions
//
// getAlerts
// ============================================================================

export const getAlerts = zodFetch<GetAlertsParams, ScheduleAlerts>(
  "/ferries/api/schedule/rest/alerts",
  getAlertsParamsSchema,
  alertsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useAlerts
// ============================================================================

export const alertsOptions = createQueryOptions({
  apiFunction: getAlerts,
  queryKey: ["wsf", "schedule", "alerts", "getAlerts"],
  cacheStrategy: "DAILY_STATIC",
});
