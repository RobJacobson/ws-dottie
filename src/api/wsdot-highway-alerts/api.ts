// WSDOT Highway Alerts API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  getHighwayAlertByIdParamsSchema,
  getHighwayAlertsByMapAreaParamsSchema,
  getHighwayAlertsParamsSchema,
} from "./inputs";
import type { HighwayAlert } from "./outputs";
import { highwayAlertArraySchema, highwayAlertSchema } from "./outputs";

// Create a factory function for WSDOT Highway Alerts API
const createFetch = createZodFetchFactory(
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc"
);

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
  const fetcher = createFetch<GetHighwayAlertsParams>("/GetAlertsAsJson", {
    input: getHighwayAlertsParamsSchema,
    output: highwayAlertArraySchema,
  });
  return fetcher(params) as Promise<HighwayAlert[]>;
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
  const fetcher = createFetch<GetHighwayAlertByIdParams>(
    "/GetAlertAsJson?AlertID={alertId}",
    {
      input: getHighwayAlertByIdParamsSchema,
      output: highwayAlertSchema,
    }
  );
  return fetcher(params) as Promise<HighwayAlert>;
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
  const fetcher = createFetch<GetHighwayAlertsByMapAreaParams>(
    "/GetAlertsByMapAreaAsJson?MapArea={mapArea}",
    {
      input: getHighwayAlertsByMapAreaParamsSchema,
      output: highwayAlertArraySchema,
    }
  );
  return fetcher(params) as Promise<HighwayAlert[]>;
};
