// WSDOT Mountain Pass Conditions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { createFetchFunction } from "@/shared/fetching/fetchApi";

import type {
  MountainPassCondition,
  MountainPassConditionsResponse,
} from "./types";

// Module-scoped fetch function for mountain pass conditions API
const fetchMountainPassConditions = createFetchFunction(
  "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc"
);

/**
 * Retrieves all mountain pass conditions from WSDOT API
 *
 * @returns Promise resolving to an array of mountain pass conditions
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const conditions = await getMountainPassConditions();
 * console.log(conditions[0].MountainPassName); // "Blewett Pass US 97"
 * ```
 */
export const getMountainPassConditions =
  (): Promise<MountainPassConditionsResponse> =>
    fetchMountainPassConditions<MountainPassConditionsResponse>(
      "/GetMountainPassConditionsAsJson"
    );

/**
 * Retrieves a specific mountain pass condition by ID
 * Note: This endpoint may not work as expected based on testing
 *
 * @param passConditionId - The ID of the specific mountain pass condition
 * @returns Promise resolving to a mountain pass condition
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const condition = await getMountainPassConditionById(1);
 * console.log(condition.MountainPassName); // "Blewett Pass US 97"
 * ```
 */
export const getMountainPassConditionById = (
  passConditionId: number
): Promise<MountainPassCondition> =>
  fetchMountainPassConditions<MountainPassCondition>(
    `/GetMountainPassConditionAsJson?PassConditionID=${passConditionId}`
  );
