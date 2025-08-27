/**
 * WSF Schedule API - Alerts
 *
 * Provides access to Washington State Ferries service alerts, bulletins, and
 * operational notifications. This API returns important information about service
 * disruptions, maintenance schedules, weather-related delays, and other updates
 * that may affect ferry operations.
 *
 * The API includes various types of alerts such as route-specific disruptions,
 * terminal maintenance, vessel issues, and general announcements. Each alert
 * contains detailed information about the issue, affected routes, and any
 * necessary actions for passengers.
 *
 * API Functions:
 * - getAlerts: Returns all active service alerts and bulletins
 *
 * Input/Output Overview:
 * - getAlerts: Input: none (no parameters required), Output: Alert[]
 *
 * Base Type: Alert
 *
 * interface Alert {
 *   BulletinID: number;
 *   BulletinFlag: boolean;
 *   BulletinText: string;
 *   CommunicationFlag: boolean;
 *   CommunicationText: string | null;
 *   RouteAlertFlag: boolean;
 *   RouteAlertText: string;
 *   HomepageAlertText: string;
 *   PublishDate: Date;
 *   DisruptionDescription: string | null;
 *   AllRoutesFlag: boolean;
 *   SortSeq: number;
 *   AlertTypeID: number;
 *   AlertType: string;
 *   AlertFullTitle: string;
 *   AffectedRouteIDs: number[];
 *   IVRText: string | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/alerts?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "BulletinID": 108800,
 *     "BulletinFlag": true,
 *     "BulletinText": "<p><span data-contrast=\"none\">Tonight, August 26, we need to take the #3 Chelan out of service early to complete vessel maintenance. #2 Samish sails in place of Chelan for the Anacortes 9:25 p.m. sailing and will run about an hour late.</span></p>",
 *     "CommunicationFlag": false,
 *     "CommunicationText": null,
 *     "RouteAlertFlag": true,
 *     "RouteAlertText": "Ana/SJs - Anacortes 9:25 pm delayed one hour tonight for vessel maintenance. #2 Samish sails in place of #3 Chelan",
 *     "HomepageAlertText": "<p><span data-contrast=\"none\">Tonight, August 26, we need to take the #3 Chelan out of service early to complete vessel maintenance. #2 Samish sails in place of Chelan for the Anacortes 9:25 p.m. sailing and will run about an hour late.</span></p>",
 *     "PublishDate": "/Date(1756235285903-0700)/",
 *     "DisruptionDescription": null,
 *     "AllRoutesFlag": false,
 *     "SortSeq": 1,
 *     "AlertTypeID": 5,
 *     "AlertType": "All Alerts",
 *     "AlertFullTitle": "Ana/SJs - Anacortes 9:25 pm delayed one hour tonight for vessel maintenance",
 *     "AffectedRouteIDs": [9, 20, 21, 22, 23, 27, 28, 272],
 *     "IVRText": null
 *   }
 * ]
 *
 * Note: The API returns alerts in order of priority (SortSeq), with the most
 * important alerts appearing first. BulletinText and HomepageAlertText contain
 * HTML-formatted content that may include links and formatting instructions.
 * Route-specific alerts only affect certain ferry routes, while general alerts
 * may apply to all routes.
 */

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

/**
 * Retrieves all active service alerts, bulletins, and operational notifications.
 *
 * This endpoint returns comprehensive information about service disruptions,
 * maintenance schedules, weather-related delays, and other updates that may
 * affect ferry operations. Alerts include detailed descriptions, affected routes,
 * and any necessary actions for passengers.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<Alert[]> - Array of active service alerts and bulletins
 *
 * @example
 * const alerts = await getAlerts();
 * console.log(alerts.length);  // 15
 * console.log(alerts[0].AlertFullTitle);  // "Ana/SJs - Anacortes 9:25 pm delayed one hour tonight for vessel maintenance"
 * console.log(alerts[0].AffectedRouteIDs.length);  // 8
 * console.log(alerts[0].PublishDate);  // 2025-08-26T17:48:05.903-07:00
 *
 * @throws {Error} When API is unavailable or authentication fails
 */
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

/**
 * Parameters for retrieving service alerts (no parameters required)
 */
export const getAlertsParamsSchema = z.object({}).describe("");

export type GetAlertsParams = z.infer<typeof getAlertsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// alertSchema
// alertsArraySchema
// Alert
// ============================================================================

/**
 * Service alert schema - represents individual service alerts and bulletins
 */
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

/**
 * Array of service alert objects - wrapper around alertSchema
 */
export const alertsArraySchema = z.array(alertSchema);

/**
 * Alert type - represents individual service alerts and bulletins
 */
export type Alert = z.infer<typeof alertSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useAlerts
// ============================================================================

/**
 * TanStack Query hook for service alerts with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<Alert[], Error> - Query result with active service alerts
 *
 * @example
 * const { data: alerts, isLoading } = useAlerts();
 * if (alerts) {
 *   console.log(alerts.length);  // 15
 *   console.log(alerts[0].AlertFullTitle);  // "Ana/SJs - Anacortes 9:25 pm delayed one hour tonight for vessel maintenance"
 * }
 */
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
