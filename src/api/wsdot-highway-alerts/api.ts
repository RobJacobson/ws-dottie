// WSDOT Highway Alerts API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import { zodFetch } from "@/shared/fetching";

import {
  type GetHighwayAlertByIdParams,
  type GetHighwayAlertsByMapAreaParams,
  type GetHighwayAlertsParams,
  getHighwayAlertByIdParamsSchema,
  getHighwayAlertsByMapAreaParamsSchema,
  getHighwayAlertsParamsSchema,
} from "./inputs";
import { highwayAlertArraySchema, highwayAlertSchema } from "./outputs";

// Base URL path for WSDOT Highway Alerts API
const WSDOT_HIGHWAY_ALERTS_BASE =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc";

/**
 * Get all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlerts({});
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlerts = async (params: GetHighwayAlertsParams = {}) => {
  return zodFetch(
    `${WSDOT_HIGHWAY_ALERTS_BASE}/GetAlertsAsJson`,
    {
      input: getHighwayAlertsParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

/**
 * Get a specific highway alert by ID from WSDOT Highway Alerts API
 *
 * Returns detailed information about a specific highway alert identified by its ID.
 *
 * @param params - Object containing alertId parameter
 * @param params.alertId - The unique identifier of the highway alert
 * @returns Promise containing the specific highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alert = await getHighwayAlertById({ alertId: 12345 });
 * console.log(alert.HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlertById = async (
  params: GetHighwayAlertByIdParams
) => {
  return zodFetch(
    `${WSDOT_HIGHWAY_ALERTS_BASE}/GetAlertAsJson?AlertID={alertId}`,
    {
      input: getHighwayAlertByIdParamsSchema,
      output: highwayAlertSchema,
    },
    params
  );
};

/**
 * Get highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific map area or region.
 *
 * @param params - Object containing mapArea parameter
 * @param params.mapArea - The map area or region to filter alerts by
 * @returns Promise containing filtered highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlertsByMapArea({ mapArea: "Seattle" });
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlertsByMapArea = async (
  params: GetHighwayAlertsByMapAreaParams
) => {
  return zodFetch(
    `${WSDOT_HIGHWAY_ALERTS_BASE}/GetAlertsByMapAreaAsJson?MapArea={mapArea}`,
    {
      input: getHighwayAlertsByMapAreaParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};
