// WSDOT Highway Alerts API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import { createFrequentUpdateOptions } from "@/shared/caching/config";

import {
  getHighwayAlertById,
  getHighwayAlerts,
  getHighwayAlertsByMapArea,
} from "./api";
import type { HighwayAlert, HighwayAlertsResponse } from "./types";

/**
 * Hook for getting all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. Uses frequent update options
 * since highway alert data changes frequently throughout the day.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data
 */
export const useHighwayAlerts = (
  options?: UseQueryOptions<HighwayAlertsResponse>
) => {
  return useQuery({
    queryKey: ["wsdot", "highwayAlerts"],
    queryFn: getHighwayAlerts,
    ...createFrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for getting a specific highway alert by ID from WSDOT Highway Alerts API
 *
 * Returns a single highway alert in JSON format based on the provided AlertID.
 * Uses frequent update options since alert data can change frequently.
 *
 * @param alertId - The unique identifier for the highway alert
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with a single highway alert
 */
export const useHighwayAlertById = (
  alertId: number,
  options?: UseQueryOptions<HighwayAlert>
) => {
  return useQuery({
    queryKey: ["wsdot", "highwayAlerts", "byId", alertId],
    queryFn: () => getHighwayAlertById(alertId),
    enabled: !!alertId,
    ...createFrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for getting highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts limited to a specific map area in JSON format.
 * Uses frequent update options since alert data changes frequently.
 *
 * @param mapArea - The map area identifier to filter alerts
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data for the specified area
 */
export const useHighwayAlertsByMapArea = (
  mapArea: string,
  options?: UseQueryOptions<HighwayAlertsResponse>
) => {
  return useQuery({
    queryKey: ["wsdot", "highwayAlerts", "byMapArea", mapArea],
    queryFn: () => getHighwayAlertsByMapArea(mapArea),
    enabled: !!mapArea,
    ...createFrequentUpdateOptions(),
    ...options,
  });
};
