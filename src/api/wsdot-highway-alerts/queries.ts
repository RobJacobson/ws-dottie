// WSDOT Highway Alerts API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import {
  getHighwayAlertById,
  getHighwayAlerts,
  getHighwayAlertsByMapArea,
} from "./api";
import type {
  GetHighwayAlertByIdParams,
  GetHighwayAlertsByMapAreaParams,
  GetHighwayAlertsParams,
} from "./inputs";
import type { HighwayAlert } from "./outputs";

/**
 * Hook for getting all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data
 */
export const useHighwayAlerts = (
  params: GetHighwayAlertsParams = {},
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlerts", params],
    queryFn: () => getHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting a specific highway alert by ID from WSDOT Highway Alerts API
 *
 * Returns detailed information about a specific highway alert identified by its ID.
 *
 * @param params - Object containing alertId parameter
 * @param params.alertId - The unique identifier of the highway alert
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with a single highway alert
 */
export const useHighwayAlertById = (
  params: GetHighwayAlertByIdParams,
  options?: TanStackOptions<HighwayAlert>
): UseQueryResult<HighwayAlert, Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlertById", params],
    queryFn: () => getHighwayAlertById(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific map area or region.
 *
 * @param params - Object containing mapArea parameter
 * @param params.mapArea - The map area or region to filter alerts by
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data for the specified area
 */
export const useHighwayAlertsByMapArea = (
  params: GetHighwayAlertsByMapAreaParams,
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlertsByMapArea", params],
    queryFn: () => getHighwayAlertsByMapArea(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
