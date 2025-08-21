// WSDOT Mountain Pass Conditions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { zodFetch } from "@/shared/fetching";

import {
  type GetMountainPassConditionByIdParams,
  type GetMountainPassConditionsParams,
  getMountainPassConditionByIdParamsSchema,
  getMountainPassConditionsParamsSchema,
} from "./inputs";
import {
  mountainPassConditionArraySchema,
  mountainPassConditionSchema,
} from "./outputs";

// Base URL path for WSDOT Mountain Pass Conditions API
const WSDOT_MOUNTAIN_PASS_CONDITIONS_BASE =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc";

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
  return zodFetch(
    `${WSDOT_MOUNTAIN_PASS_CONDITIONS_BASE}/GetMountainPassConditionsAsJson`,
    {
      input: getMountainPassConditionsParamsSchema,
      output: mountainPassConditionArraySchema,
    },
    params
  );
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
  return zodFetch(
    `${WSDOT_MOUNTAIN_PASS_CONDITIONS_BASE}/GetMountainPassConditionAsJson?PassConditionID={passConditionId}`,
    {
      input: getMountainPassConditionByIdParamsSchema,
      output: mountainPassConditionSchema,
    },
    params
  );
};
