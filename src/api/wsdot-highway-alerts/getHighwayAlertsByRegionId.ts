import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { HighwayAlert } from "./getHighwayAlertById";
import { highwayAlertArraySchema } from "./getHighwayAlerts";

// ============================================================================
// API Function
//
// getHighwayAlertsByRegionId
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}";

/**
 * Get highway alerts by region ID from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific WSDOT region ID. This endpoint
 * provides alerts for a particular geographic region within Washington State.
 *
 * @param params - Object containing RegionId parameter
 * @param params.RegionId - The WSDOT region ID to filter alerts by
 * @returns Promise containing filtered highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlertsByRegionId = async (
  params: GetHighwayAlertsByRegionIdParams
): Promise<HighwayAlert[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayAlertsByRegionIdParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getHighwayAlertsByRegionIdParamsSchema
// GetHighwayAlertsByRegionIdParams
// ============================================================================

export const getHighwayAlertsByRegionIdParamsSchema = z
  .object({
    RegionId: z
      .number()
      .int()
      .positive()
      .describe(
        "The WSDOT region ID to filter highway alerts by. This ID represents a specific geographic region within Washington State where alerts should be retrieved. Examples include region IDs for Northwest, Northeast, Southwest, Southeast, Central, Olympic Peninsula, or Puget Sound areas."
      ),
  })
  .describe(
    "Parameters for retrieving highway alerts filtered by a specific WSDOT region ID"
  );

export type GetHighwayAlertsByRegionIdParams = z.infer<
  typeof getHighwayAlertsByRegionIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// highwayAlertArraySchema (imported from ./getHighwayAlerts)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useHighwayAlertsByRegionId
// ============================================================================

/**
 * Hook for getting highway alerts by region ID from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific WSDOT region ID. This endpoint
 * provides alerts for a particular geographic region within Washington State.
 *
 * @param params - Object containing RegionId parameter
 * @param params.RegionId - The WSDOT region ID to filter alerts by
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data for the specified region
 */
export const useHighwayAlertsByRegionId = (
  params: GetHighwayAlertsByRegionIdParams,
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertsByRegionId",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlertsByRegionId(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
