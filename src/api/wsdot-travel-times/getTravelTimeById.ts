import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { type TravelTimeRoute, travelTimeRouteSchema } from "./getTravelTimes";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Get specific travel time by ID from WSDOT Travel Times API
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route
 * @returns Promise containing the specific travel time data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTime = await getTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime.CurrentTime); // 30
 * ```
 */
export const getTravelTimeById = async (
  params: GetTravelTimeByIdParams
): Promise<TravelTimeRoute> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTravelTimeByIdParamsSchema,
      output: travelTimeRouteSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTravelTimeByIdParamsSchema = z
  .object({
    travelTimeId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific travel time route to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getTravelTimes endpoint or other travel time listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific travel time route by its unique identifier"
  );

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Uses the same schema as the base endpoint - imported from getTravelTimes

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting a specific travel time by ID from WSDOT Travel Times API
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with specific travel time data
 *
 * @example
 * ```typescript
 * const { data: travelTime } = useTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime?.CurrentTime); // 30
 * ```
 */
export const useTravelTimeById = (
  params: GetTravelTimeByIdParams,
  options?: TanStackOptions<TravelTimeRoute>
): UseQueryResult<TravelTimeRoute, Error> => {
  return useQuery({
    queryKey: ["wsdot", "travel-times", "getTravelTimeById", params],
    queryFn: () => getTravelTimeById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
