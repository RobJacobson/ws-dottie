import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Get event categories from WSDOT Highway Alerts API
 *
 * Returns a list of all event categories used by highway alerts. This endpoint
 * provides the available classification types for traffic events and incidents.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing array of event category strings
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const categories = await getEventCategories({});
 * console.log(categories); // ["Collision", "Construction", "Weather", ...]
 * ```
 */
export const getEventCategories = async (
  params: GetEventCategoriesParams = {}
): Promise<string[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getEventCategoriesParamsSchema,
      output: eventCategoriesArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getEventCategoriesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting event categories. The API returns all available event categories used by highway alerts."
  );

export type GetEventCategoriesParams = z.infer<
  typeof getEventCategoriesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const eventCategoriesArraySchema = z
  .array(z.string())
  .describe(
    "Array of event category strings used to classify highway alerts and traffic events. Examples include 'Collision', 'Construction', 'Weather', 'Special Event', 'Road Closure', 'Maintenance', and 'Other'. These categories help users understand the nature of traffic disruptions and filter alerts by type."
  );

export type EventCategories = z.infer<typeof eventCategoriesArraySchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting event categories from WSDOT Highway Alerts API
 *
 * Returns a list of all event categories used by highway alerts. This endpoint
 * provides the available classification types for traffic events and incidents.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with array of event category strings
 */
export const useEventCategories = (
  params: GetEventCategoriesParams = {},
  options?: TanStackOptions<string[]>
): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getEventCategories", params],
    queryFn: () => getEventCategories(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
