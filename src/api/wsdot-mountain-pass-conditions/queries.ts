// WSDOT Mountain Pass Conditions API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import { getMountainPassConditionById, getMountainPassConditions } from "./api";
import type { MountainPassCondition } from "./types";

/**
 * React Query hook for retrieving all mountain pass conditions
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param options - Optional query options
 * @returns React Query result containing mountain pass conditions data
 *
 * @example
 * ```typescript
 * const { data: conditions } = useMountainPassConditions();
 * console.log(conditions[0].MountainPassName); // "Blewett Pass US 97"
 * ```
 */
export const useMountainPassConditions = (
  options?: Parameters<typeof useQuery<MountainPassCondition[]>>[0]
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditions",
    ],
    queryFn: () => getMountainPassConditions(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving a specific mountain pass condition by ID
 * Note: This endpoint may not work as expected based on testing
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID.
 *
 * @param params - Object containing passConditionId
 * @param params.passConditionId - The ID of the specific mountain pass condition
 * @param options - Optional query options
 * @returns React Query result containing mountain pass condition data
 *
 * @example
 * ```typescript
 * const { data: condition } = useMountainPassConditionById({ passConditionId: 1 });
 * console.log(condition.MountainPassName); // "Blewett Pass US 97"
 * ```
 */
export const useMountainPassConditionById = (
  params: { passConditionId: number },
  options?: Parameters<typeof useQuery<MountainPassCondition>>[0]
) => {
  return useQuery<MountainPassCondition>({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditionById",
      params.passConditionId,
    ],
    queryFn: () =>
      getMountainPassConditionById({ passConditionId: params.passConditionId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
