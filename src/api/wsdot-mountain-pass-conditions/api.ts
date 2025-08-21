// WSDOT Mountain Pass Conditions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  type GetMountainPassConditionByIdParams,
  type GetMountainPassConditionsParams,
  getMountainPassConditionByIdParamsSchema,
  getMountainPassConditionsParamsSchema,
} from "./inputs";
import type { MountainPassCondition } from "./outputs";
import {
  mountainPassConditionArraySchema,
  mountainPassConditionSchema,
} from "./outputs";

// Create a factory function for WSDOT Mountain Pass Conditions API
const createFetch = createZodFetchFactory(
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc"
);

/**
 * Retrieves all mountain pass conditions from WSDOT API
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all mountain pass condition data
 * @throws {Error} When the API request fails or validation fails
 */
export const getMountainPassConditions = async (
  params: GetMountainPassConditionsParams = {}
) => {
  const fetcher = createFetch<GetMountainPassConditionsParams>(
    "/GetMountainPassConditionsAsJson",
    {
      input: getMountainPassConditionsParamsSchema,
      output: mountainPassConditionArraySchema,
    }
  );
  return fetcher(params) as Promise<MountainPassCondition[]>;
};

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
 */
export const getMountainPassConditionById = async (
  params: GetMountainPassConditionByIdParams
) => {
  const fetcher = createFetch<GetMountainPassConditionByIdParams>(
    "/GetMountainPassConditionAsJson?PassConditionID={passConditionId}",
    {
      input: getMountainPassConditionByIdParamsSchema,
      output: mountainPassConditionSchema,
    }
  );
  return fetcher(params) as Promise<MountainPassCondition>;
};
