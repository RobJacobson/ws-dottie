import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getAlerts
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/alerts";

export const getAlerts = async (
  params: GetAlertsParams = {}
): Promise<Alert[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getAlertsParamsSchema,
      output: alertsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getAlertsParamsSchema
// GetAlertsParams
// ============================================================================

export const getAlertsParamsSchema = z.object({}).describe("");

export type GetAlertsParams = z.infer<typeof getAlertsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// alertSchema
// alertsArraySchema
// Alert
// ============================================================================

export const alertSchema = z
  .object({
    BulletinID: z.number().int().positive().describe(""),
    BulletinFlag: z.boolean().describe(""),
    BulletinText: z.string().describe(""),
    CommunicationFlag: z.boolean().describe(""),
    CommunicationText: z.string().nullable().describe(""),
    RouteAlertFlag: z.boolean().describe(""),
    RouteAlertText: z.string().describe(""),
    HomepageAlertText: z.string().describe(""),
    PublishDate: zWsdotDate().describe(""),
    DisruptionDescription: z.string().nullable().describe(""),
    AllRoutesFlag: z.boolean().describe(""),
    SortSeq: z.number().int().min(0).describe(""),
    AlertTypeID: z.number().int().positive().describe(""),
    AlertType: z.string().describe(""),
    AlertFullTitle: z.string().describe(""),
    AffectedRouteIDs: z.array(z.number().int().positive()).describe(""),
    IVRText: z.string().nullable().describe(""),
  })
  .describe("");

export const alertsArraySchema = z.array(alertSchema);

export type Alert = z.infer<typeof alertSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useAlerts
// ============================================================================

export const useAlerts = (
  params: GetAlertsParams = {},
  options?: UseQueryOptions<Alert[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "alerts"],
    queryFn: () => getAlerts(params),
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
