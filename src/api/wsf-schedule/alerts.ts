import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getAlerts
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/alerts";

/**
 * API function for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @returns Promise resolving to an array of Alert objects containing alert information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const alerts = await getAlerts();
 * console.log(alerts[0].BulletinText); // "Service disruption on Seattle-Bainbridge route"
 * ```
 */
export const getAlerts = async (): Promise<Alert[]> => {
  return zodFetch(ENDPOINT, {
    output: alertsArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// No input parameters for this endpoint
// ============================================================================

// ============================================================================
// Output Schema & Types
//
// alertSchema
// alertsArraySchema
// Alert
// ============================================================================

export const alertSchema = z
  .object({
    BulletinID: z.number().describe(""),
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
    SortSeq: z.number().describe(""),
    AlertTypeID: z.number().describe(""),
    AlertType: z.string().describe(""),
    AlertFullTitle: z.string().describe(""),
    AffectedRouteIDs: z.array(z.number()).describe(""),
    IVRText: z.string().nullable().describe(""),
  })
  .describe("");

export const alertsArraySchema = z.array(alertSchema);

export type Alert = z.infer<typeof alertSchema>;

// ============================================================================
// TanStack Query Hook
//
// useAlerts
// ============================================================================

/**
 * React Query hook for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing alert information
 *
 * @example
 * ```typescript
 * const { data: alerts } = useAlerts();
 * console.log(alerts?.[0]?.BulletinText); // "Service disruption on Seattle-Bainbridge route"
 * ```
 */
export const useAlerts = (options?: TanStackOptions<Alert[]>) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "alerts"],
    queryFn: () => getAlerts(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
