// WSDOT Mountain Pass Conditions API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import { getMountainPassConditionById, getMountainPassConditions } from "./api";
import type {
  GetMountainPassConditionByIdParams,
  GetMountainPassConditionsParams,
} from "./inputs";
import type { MountainPassCondition } from "./outputs";

/**
 * React Query hook for retrieving all mountain pass conditions
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing mountain pass conditions data
 *
 * @example
 * ```typescript
 * const { data: conditions } = useMountainPassConditions({});
 * console.log(conditions[0].MountainPassName); // "Blewett Pass US 97"
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

/**
 * React Query hook for retrieving a specific mountain pass condition by ID
 * Note: This endpoint may not work as expected based on testing
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID.
 *
 * @param params - Object containing passConditionId parameter
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
  params: GetMountainPassConditionByIdParams,
  options?: TanStackOptions<MountainPassCondition>
): UseQueryResult<MountainPassCondition, Error> => {
  return useQuery<MountainPassCondition>({
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
