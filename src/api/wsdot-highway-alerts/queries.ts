// WSDOT Highway Alerts API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import {
  getHighwayAlertById,
  getHighwayAlerts,
  getHighwayAlertsByMapArea,
} from "./api";
import type { HighwayAlert } from "./schemas";

/**
 * Hook for getting all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data
 */
export const useHighwayAlerts = (
  options?: QueryOptionsWithoutKey<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlerts"],
    queryFn: () => getHighwayAlerts(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting a specific highway alert by ID from WSDOT Highway Alerts API
 *
 * Returns detailed information about a specific highway alert identified by its ID.
 *
 * @param params - Object containing alertId
 * @param params.alertId - The unique identifier of the highway alert
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with a single highway alert
 */
export const useHighwayAlertById = (
  params: { alertId: number },
  options?: QueryOptionsWithoutKey<HighwayAlert>
): UseQueryResult<HighwayAlert, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertById",
      params.alertId,
    ],
    queryFn: () => getHighwayAlertById({ alertId: params.alertId }),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific map area or region.
 *
 * @param params - Object containing mapArea
 * @param params.mapArea - The map area or region to filter alerts by
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data for the specified area
 */
export const useHighwayAlertsByMapArea = (
  params: { mapArea: string },
  options?: QueryOptionsWithoutKey<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertsByMapArea",
      params.mapArea,
    ],
    queryFn: () => getHighwayAlertsByMapArea({ mapArea: params.mapArea }),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
