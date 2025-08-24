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
// getHighwayAlertsByMapArea
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}";

/**
 * Get highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific map area or region.
 *
 * @param params - Object containing MapArea parameter
 * @param params.MapArea - The map area or region to filter alerts by
 * @returns Promise containing filtered highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlertsByMapArea({ MapArea: "Seattle" });
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlertsByMapArea = async (
  params: GetHighwayAlertsByMapAreaParams
): Promise<HighwayAlert[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayAlertsByMapAreaParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getHighwayAlertsByMapAreaParamsSchema
// GetHighwayAlertsByMapAreaParams
// ============================================================================

export const getHighwayAlertsByMapAreaParamsSchema = z
  .object({
    MapArea: z
      .string()
      .min(1, "Map area cannot be empty")
      .describe(
        "The map area or region to filter highway alerts by. Examples include 'Seattle', 'Tacoma', 'Spokane', 'Eastern Washington', or 'Western Washington'. This parameter filters alerts to show only those relevant to the specified geographic area."
      ),
  })
  .describe(
    "Parameters for retrieving highway alerts filtered by a specific map area or region"
  );

export type GetHighwayAlertsByMapAreaParams = z.infer<
  typeof getHighwayAlertsByMapAreaParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// highwayAlertArraySchema (imported from ./getHighwayAlerts)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useHighwayAlertsByMapArea
// ============================================================================

/**
 * Hook for getting highway alerts by map area from WSDOT Highway Alerts API
 *
 * Returns highway alerts filtered by a specific map area or region.
 *
 * @param params - Object containing MapArea parameter
 * @param params.MapArea - The map area or region to filter alerts by
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data for the specified area
 */
export const useHighwayAlertsByMapArea = (
  params: GetHighwayAlertsByMapAreaParams,
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertsByMapArea",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlertsByMapArea(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
