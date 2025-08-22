import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { type HighwayAlert, highwayAlertSchema } from "./getHighwayAlerts";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={alertId}";

// ============================================================================
// API FUNCTION
// ============================================================================

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
): Promise<HighwayAlert> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayAlertByIdParamsSchema,
      output: highwayAlertSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getHighwayAlertByIdParamsSchema = z
  .object({
    alertId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific highway alert to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getHighwayAlerts endpoint or other alert listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific highway alert by its unique identifier"
  );

export type GetHighwayAlertByIdParams = z.infer<
  typeof getHighwayAlertByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Re-export the schema and type from the main file
export { type HighwayAlert, highwayAlertSchema } from "./getHighwayAlerts";

// ============================================================================
// QUERY
// ============================================================================

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
