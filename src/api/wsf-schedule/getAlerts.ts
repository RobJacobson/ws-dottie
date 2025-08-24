import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

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
    BulletinID: z
      .number()
      .describe(
        "Unique identifier for the bulletin. Primary key for bulletin identification and used to reference specific bulletin details across systems."
      ),
    BulletinFlag: z
      .boolean()
      .describe(
        "Flag indicating whether this bulletin is active. True when the bulletin is currently in effect, false when it's inactive."
      ),
    BulletinText: z
      .string()
      .describe(
        "Text content of the bulletin. Contains the bulletin message and important information that passengers need to know about service changes."
      ),
    CommunicationFlag: z
      .boolean()
      .describe(
        "Flag indicating whether this is a communication bulletin. True when the bulletin is for communication purposes, false otherwise."
      ),
    CommunicationText: z
      .string()
      .nullable()
      .describe(
        "Text content for communication purposes. Contains additional communication information when CommunicationFlag is true."
      ),
    RouteAlertFlag: z
      .boolean()
      .describe(
        "Flag indicating whether this is a route-specific alert. True when the alert affects specific routes, false when it's general."
      ),
    RouteAlertText: z
      .string()
      .describe(
        "Text content of the route alert. Contains route-specific alert information when RouteAlertFlag is true."
      ),
    HomepageAlertText: z
      .string()
      .describe(
        "Text content for homepage display. Contains alert information formatted for display on the WSF homepage."
      ),
    PublishDate: zWsdotDate().describe(
      "Date when the bulletin was published. Indicates when the bulletin became available and when it was last updated."
    ),
    DisruptionDescription: z
      .string()
      .nullable()
      .describe(
        "Description of any service disruption. Contains details about delays, cancellations, or other operational issues."
      ),
    AllRoutesFlag: z
      .boolean()
      .describe(
        "Flag indicating whether this alert affects all routes. True when the alert applies to all ferry routes, false when it's route-specific."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures alerts are displayed in the correct order across different systems and interfaces."
      ),
    AlertTypeID: z
      .number()
      .describe(
        "Unique identifier for the alert type. Categorizes the nature of the alert (e.g., 1=General, 2=Route-specific, 3=Service disruption)."
      ),
    AlertType: z
      .string()
      .describe(
        "Human-readable description of the alert type. Categorizes the nature of the alert (e.g., 'All Alerts', 'Route Alerts', 'Service Disruptions')."
      ),
    AlertFullTitle: z
      .string()
      .describe(
        "Full title of the alert. Provides a complete, descriptive title for the alert that can be used in displays and notifications."
      ),
    AffectedRouteIDs: z
      .array(z.number())
      .describe(
        "Array of route IDs affected by this alert. Contains the unique identifiers for routes that are impacted by the alert."
      ),
    IVRText: z
      .string()
      .nullable()
      .describe(
        "Text version of the alert optimized for Interactive Voice Response systems. Used for phone-based inquiries and automated announcements."
      ),
  })
  .describe(
    "Alert information for schedule changes, service disruptions, or important notices affecting ferry operations. These alerts help passengers understand current service status and any modifications to normal operations."
  );

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
