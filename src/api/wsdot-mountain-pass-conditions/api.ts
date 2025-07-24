// WSDOT Mountain Pass Conditions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/createFetchFactory";

import type { MountainPassCondition } from "./types";

// Create a factory function for WSDOT Mountain Pass Conditions API
const createWsdotMountainPassConditionsFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc"
);

/**
 * Retrieves all mountain pass conditions from WSDOT API
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all mountain pass condition data
 * @throws {WsdotApiError} When the API request fails
 */
export const getMountainPassConditions = createWsdotMountainPassConditionsFetch<
  MountainPassCondition[]
>("/GetMountainPassConditionsAsJson");

/**
 * Retrieves a specific mountain pass condition by ID
 * Note: This endpoint may not work as expected based on testing
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID.
 *
 * @param params - Object containing passConditionId and optional logMode
 * @param params.passConditionId - The ID of the specific mountain pass condition
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing the specific mountain pass condition data
 * @throws {WsdotApiError} When the API request fails
 */
export const getMountainPassConditionById =
  createWsdotMountainPassConditionsFetch<
    { passConditionId: number },
    MountainPassCondition
  >("/GetMountainPassConditionAsJson?PassConditionID={passConditionId}");
