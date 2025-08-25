import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { type HighwayAlert, highwayAlertSchema } from "./getHighwayAlertById";

// ============================================================================
// API Function
//
// getHighwayAlerts
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson";

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
    ENDPOINT,
    {
      input: getHighwayAlertsParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getHighwayAlertsParamsSchema
// GetHighwayAlertsParams
// ============================================================================

export const getHighwayAlertsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all highway alerts. The API returns all active highway alerts across Washington State."
  );

export type GetHighwayAlertsParams = z.infer<
  typeof getHighwayAlertsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// highwayAlertArraySchema
// ============================================================================

export const highwayAlertArraySchema = z
  .array(highwayAlertSchema)
  .describe(
    "Array of highway alert data for all active alerts across Washington State highways. This collection provides comprehensive alert information that enables traffic monitoring, route planning, and transportation safety management."
  );

// ============================================================================
// TanStack Query Hook
//
// useHighwayAlerts
// ============================================================================

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
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlerts",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
