import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import {
  type MountainPassCondition,
  mountainPassConditionSchema,
} from "./getMountainPassConditionById";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Retrieves all mountain pass conditions from WSDOT API
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all mountain pass condition data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const conditions = await getMountainPassConditions({});
 * console.log(conditions[0].MountainPassName); // "Snoqualmie Pass"
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
// INPUT SCHEMA & TYPES
// ============================================================================

export const getMountainPassConditionsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all mountain pass conditions. The API returns current mountain pass conditions across Washington State, including road conditions, restrictions, and travel advisories."
  );

export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;
// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const mountainPassConditionArraySchema = z
  .array(mountainPassConditionSchema)
  .describe(
    "Array of mountain pass condition data for all active passes across Washington State. This collection provides comprehensive condition information that enables safe mountain travel planning, winter driving preparation, and transportation safety management."
  );

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting all mountain pass conditions from WSDOT Mountain Pass Conditions API
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with mountain pass condition data
 *
 * @example
 * ```typescript
 * const { data: conditions } = useMountainPassConditions({});
 * console.log(conditions?.[0]?.MountainPassName); // "Snoqualmie Pass"
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
      params,
    ],
    queryFn: () => getMountainPassConditions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
