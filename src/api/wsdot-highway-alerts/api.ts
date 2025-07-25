// WSDOT Highway Alerts API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/api";

import type { HighwayAlert } from "./types";

// Create a factory function for WSDOT Highway Alerts API
const createWsdotHighwayAlertsFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc"
);

/**
 * Get all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all highway alert data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlerts();
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlerts =
  createWsdotHighwayAlertsFetch<HighwayAlert[]>("/GetAlertsAsJson");

/**
 * Get a specific highway alert by ID from WSDOT Highway Alerts API
 *
 * Returns detailed information about a specific highway alert identified by its ID.
 *
 * @param params - Object containing alertId and optional logMode
 * @param params.alertId - The unique identifier of the highway alert
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing the specific highway alert data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const alert = await getHighwayAlertById({ alertId: 12345 });
 * console.log(alert.HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlertById = createWsdotHighwayAlertsFetch<
  { alertId: number },
  HighwayAlert
>("/GetAlertAsJson?AlertID={alertId}");

/**
 * Get highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific map area or region.
 *
 * @param params - Object containing mapArea and optional logMode
 * @param params.mapArea - The map area or region to filter alerts by
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing filtered highway alert data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlertsByMapArea({ mapArea: "Seattle" });
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlertsByMapArea = createWsdotHighwayAlertsFetch<
  { mapArea: string },
  HighwayAlert[]
>("/GetAlertsByMapAreaAsJson?MapArea={mapArea}");
