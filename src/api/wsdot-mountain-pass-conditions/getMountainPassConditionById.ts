import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import {
  type MountainPassCondition,
  mountainPassConditionSchema,
} from "./getMountainPassConditions";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJson?PassConditionID={passConditionId}";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Retrieves a specific mountain pass condition by ID
 * Note: This endpoint may not work as expected based on testing
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID.
 *
 * @param params - Object containing passConditionId parameter
 * @param params.passConditionId - The ID of the specific mountain pass condition
 * @returns Promise containing the specific mountain pass condition data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const condition = await getMountainPassConditionById({ passConditionId: 1 });
 * console.log(condition.MountainPassName); // "Snoqualmie Pass"
 * ```
 */
export const getMountainPassConditionById = async (
  params: GetMountainPassConditionByIdParams
): Promise<MountainPassCondition> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getMountainPassConditionByIdParamsSchema,
      output: mountainPassConditionSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getMountainPassConditionByIdParamsSchema = z
  .object({
    passConditionId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific mountain pass condition to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getMountainPassConditions endpoint or other mountain pass listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific mountain pass condition by its unique identifier. Note: This endpoint may not work as expected based on testing."
  );

export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Uses the same schema as the base endpoint - imported from getMountainPassConditions

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting a specific mountain pass condition by ID from WSDOT Mountain Pass Conditions API
 * Note: This endpoint may not work as expected based on testing
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID.
 *
 * @param params - Object containing passConditionId parameter
 * @param params.passConditionId - The ID of the specific mountain pass condition
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with specific mountain pass condition data
 *
 * @example
 * ```typescript
 * const { data: condition } = useMountainPassConditionById({ passConditionId: 1 });
 * console.log(condition?.MountainPassName); // "Snoqualmie Pass"
 * ```
 */
export const useMountainPassConditionById = (
  params: GetMountainPassConditionByIdParams,
  options?: TanStackOptions<MountainPassCondition>
): UseQueryResult<MountainPassCondition, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditionById",
      params,
    ],
    queryFn: () => getMountainPassConditionById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
