// WSDOT Mountain Pass Conditions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { fetchWsdot } from "@/shared/fetching/fetch";

import type {
  MountainPassCondition,
  MountainPassConditionsResponse,
} from "./types";

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
  async (): Promise<MountainPassConditionsResponse> => {
    return await fetchWsdot<MountainPassConditionsResponse>(
      "mountainPassConditions",
      "/GetMountainPassConditionsAsJson"
    );
  };

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
export const getMountainPassConditionById = async (
  passConditionId: number
): Promise<MountainPassCondition> => {
  return await fetchWsdot<MountainPassCondition>(
    "mountainPassConditions",
    `/GetMountainPassConditionAsJson?PassConditionID=${passConditionId}`
  );
};
