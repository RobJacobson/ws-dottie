import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import {
  type MountainPassCondition,
  mountainPassConditionSchema,
} from "./getMountainPassConditionById";

// ============================================================================
// API Function
//
// getMountainPassConditions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson";

/**
 * Retrieves all mountain pass conditions from WSDOT Mountain Pass Conditions API
 *
 * Returns comprehensive condition data for all 16 active mountain passes across Washington State,
 * including Snoqualmie Pass I-90, Stevens Pass US 2, White Pass US 12, Chinook Pass SR 410,
 * and others. Each pass includes real-time road conditions, travel restrictions, weather
 * information, temperature data, and elevation details critical for safe mountain travel
 * planning during winter and shoulder seasons.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all mountain pass condition data with detailed conditions for each pass
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const conditions = await getMountainPassConditions({});
 * console.log(conditions[0].MountainPassName); // "Snoqualmie Pass I-90"
 * console.log(conditions[0].ElevationInFeet); // 3022
 * console.log(conditions[0].RoadCondition); // Current road surface conditions
 * ```
 */
export const getMountainPassConditions = async (
  params: GetMountainPassConditionsParams = {}
): Promise<MountainPassCondition[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getMountainPassConditionsParamsSchema,
      output: mountainPassConditionArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getMountainPassConditionsParamsSchema
// GetMountainPassConditionsParams
// ============================================================================

export const getMountainPassConditionsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all mountain pass conditions. The API returns comprehensive condition data for all 16 active mountain passes across Washington State, including Snoqualmie Pass I-90, Stevens Pass US 2, White Pass US 12, Chinook Pass SR 410, and others. Each pass includes current road conditions, travel restrictions, weather information, and elevation data critical for safe mountain travel planning during winter and shoulder seasons."
  );

export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;
// ============================================================================
// Output Schema & Types
//
// mountainPassConditionArraySchema
// ============================================================================

export const mountainPassConditionArraySchema = z
  .array(mountainPassConditionSchema)
  .describe(
    "Array of mountain pass condition data for all 16 active mountain passes across Washington State. This comprehensive collection includes detailed conditions for major passes like Snoqualmie Pass I-90 (3022 ft), Stevens Pass US 2 (4061 ft), White Pass US 12 (4500 ft), Chinook Pass SR 410 (5430 ft), and others. Each pass provides real-time road conditions, travel restrictions, weather data, and temperature information essential for winter travel planning, commercial vehicle routing, and recreation trip preparation. The data is updated regularly to support safe passage through Washington's mountainous regions."
  );

// ============================================================================
// TanStack Query Hook
//
// useMountainPassConditions
// ============================================================================

/**
 * Hook for getting all mountain pass conditions from WSDOT Mountain Pass Conditions API
 *
 * Returns comprehensive condition data for all 16 active mountain passes across Washington State,
 * including Snoqualmie Pass I-90 (3022 ft), Stevens Pass US 2 (4061 ft), White Pass US 12 (4500 ft),
 * Chinook Pass SR 410 (5430 ft), and others. Each pass includes real-time road conditions,
 * travel restrictions, weather information, and temperature data essential for winter travel
 * planning, commercial vehicle routing, and recreation trip preparation.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with mountain pass condition data array
 *
 * @example
 * ```typescript
 * const { data: conditions } = useMountainPassConditions({});
 * console.log(conditions?.[0]?.MountainPassName); // "Snoqualmie Pass I-90"
 * console.log(conditions?.[0]?.ElevationInFeet); // 3022
 * console.log(conditions?.find(pass => pass.MountainPassName === 'White Pass US 12')?.RoadCondition); // Current conditions
 * ```
 */
export const useMountainPassConditions = (
  params: GetMountainPassConditionsParams = {},
  options?: TanStackOptions<MountainPassCondition[]>
): UseQueryResult<MountainPassCondition[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditions",
      JSON.stringify(params),
    ],
    queryFn: () => getMountainPassConditions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
