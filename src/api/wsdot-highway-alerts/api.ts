// WSDOT Highway Alerts API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import { createApiClient } from "@/shared/fetching/apiClient";

import type { HighwayAlert } from "./types";

// Module-scoped fetch function for highway alerts API
const fetchHighwayAlerts = createApiClient(
  "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc"
);

/**
 * Get all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @returns Promise resolving to array of highway alert data
 */
export const getHighwayAlerts = (): Promise<HighwayAlert[]> =>
  fetchHighwayAlerts<HighwayAlert[]>("/GetAlertsAsJson");

/**
 * Get a specific highway alert by ID from WSDOT Highway Alerts API
 *
 * Returns a single highway alert in JSON format based on the provided AlertID.
 *
 * @param alertId - The unique identifier for the highway alert
 * @returns Promise resolving to a single highway alert
 */
export const getHighwayAlertById = (alertId: number): Promise<HighwayAlert> =>
  fetchHighwayAlerts<HighwayAlert>(`/GetAlertAsJson?AlertID=${alertId}`);

/**
 * Get highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts limited to a specific map area in JSON format.
 * The MapArea parameter filters alerts to a specific geographic region.
 *
 * @param mapArea - The map area identifier to filter alerts
 * @returns Promise resolving to array of highway alert data for the specified area
 */
export const getHighwayAlertsByMapArea = (
  mapArea: string
): Promise<HighwayAlert[]> =>
  fetchHighwayAlerts<HighwayAlert[]>(
    `/GetAlertsByMapAreaAsJson?MapArea=${encodeURIComponent(mapArea)}`
  );
