import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "./getTravelTimeById";

// ============================================================================
// API Function
//
// getTravelTimes
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson";

/**
 * Get all travel times from WSDOT Travel Times API
 *
 * Retrieves current travel time data for all monitored routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all travel time data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTimes = await getTravelTimes({});
 * console.log(travelTimes[0].CurrentTime); // 30
 * ```
 */
export const getTravelTimes = async (
  params: GetTravelTimesParams = {}
): Promise<TravelTimeRoute[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTravelTimesParamsSchema,
      output: travelTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTravelTimesParamsSchema
// GetTravelTimesParams
// ============================================================================

export const getTravelTimesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all travel times. The API returns current travel time data for all monitored routes across Washington State."
  );

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// travelTimesArraySchema
// ============================================================================

export const travelTimesArraySchema = z
  .array(travelTimeRouteSchema)
  .describe(
    "Array of travel time route data for all monitored routes across Washington State. This collection provides comprehensive travel time information that enables route planning, congestion monitoring, and travel time estimation."
  );

export type TravelTimesResponse = z.infer<typeof travelTimesArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useTravelTimes
// ============================================================================

/**
 * Hook for getting all travel times from WSDOT Travel Times API
 *
 * Retrieves current travel time data for all monitored routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with travel time data
 *
 * @example
 * ```typescript
 * const { data: travelTimes } = useTravelTimes({});
 * console.log(travelTimes?.[0]?.CurrentTime); // 30
 * ```
 */
export const useTravelTimes = (
  params: GetTravelTimesParams = {},
  options?: TanStackOptions<TravelTimeRoute[]>
): UseQueryResult<TravelTimeRoute[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "travel-times",
      "getTravelTimes",
      JSON.stringify(params),
    ],
    queryFn: () => getTravelTimes(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
