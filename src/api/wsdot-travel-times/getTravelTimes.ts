import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

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
 * Retrieves current travel time data for all monitored routes across Washington State.
 * This data is collected through the Washington State Department of Transportation's
 * traffic monitoring program and provides real-time travel time estimates for major
 * transportation corridors. The data includes routes between major cities and is
 * essential for trip planning, congestion analysis, and navigation applications.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all travel time data with current and average times
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTimes = await getTravelTimes({});
 * console.log(travelTimes[0].CurrentTime); // 40 (current travel time in minutes)
 * console.log(travelTimes[0].AverageTime); // 31 (historical average in minutes)
 * console.log(travelTimes[0].Name); // "Everett-Seattle HOV" (route name)
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
    "No parameters required for getting all travel times. The API returns comprehensive real-time travel time data for all monitored routes across Washington State, including major corridors like I-5, I-90, I-405, SR 520, and US 2. This data includes routes between cities like Seattle, Bellevue, Everett, Tacoma, and Vancouver, with travel times ranging from minutes to over an hour depending on traffic conditions."
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
    "Array of travel time route data for all monitored routes across Washington State. This comprehensive collection includes over 90 travel time corridors covering major highways and interstates, with routes ranging from 8 miles (like Federal Way to SeaTac) to over 26 miles (like Bellevue to Everett). Each route includes current travel time, average travel time, distance, and geographic coordinates for navigation and trip planning applications."
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
 * Retrieves current travel time data for all monitored routes across Washington State.
 * This hook provides real-time travel time estimates that update frequently to support
 * navigation applications, trip planning, and congestion monitoring. The data includes
 * current travel times compared to historical averages, helping users make informed
 * routing decisions during peak traffic hours.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with travel time data array for real-time routing
 *
 * @example
 * ```typescript
 * const { data: travelTimes } = useTravelTimes({});
 * console.log(travelTimes?.[0]?.CurrentTime); // 40 (current time in minutes)
 * console.log(travelTimes?.[0]?.AverageTime); // 31 (historical average)
 * console.log(travelTimes?.find(route => route.Name === 'Bellevue-Seattle')?.Distance); // 10.53
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
