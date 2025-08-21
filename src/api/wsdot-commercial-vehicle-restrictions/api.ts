// WSDOT Commercial Vehicle Restrictions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  getCommercialVehicleRestrictionsParamsSchema,
  getCommercialVehicleRestrictionsWithIdParamsSchema,
} from "./inputs";
import type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionWithId,
} from "./outputs";
import {
  commercialVehicleRestrictionArraySchema,
  commercialVehicleRestrictionWithIdArraySchema,
} from "./outputs";

// Create a factory function for WSDOT Commercial Vehicle Restrictions API
const createFetch = createZodFetchFactory(
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc"
);

/**
 * Get commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to array of commercial vehicle restriction data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const restrictions = await getCommercialVehicleRestrictions({});
 * console.log(restrictions[0].BridgeName); // "Aurora Bridge"
 * ```
 */
export const getCommercialVehicleRestrictions = async (
  params: GetCommercialVehicleRestrictionsParams = {}
) => {
  const fetcher = createFetch<GetCommercialVehicleRestrictionsParams>(
    "/GetCommercialVehicleRestrictionsAsJson",
    {
      input: getCommercialVehicleRestrictionsParamsSchema,
      output: commercialVehicleRestrictionArraySchema,
    }
  );
  return fetcher(params) as Promise<CommercialVehicleRestriction[]>;
};

/**
 * Get commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to array of commercial vehicle restriction data with unique IDs
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const restrictions = await getCommercialVehicleRestrictionsWithId({});
 * console.log(restrictions[0].UniqueID); // "12345"
 * ```
 */
export const getCommercialVehicleRestrictionsWithId = async (
  params: GetCommercialVehicleRestrictionsWithIdParams = {}
) => {
  const fetcher = createFetch<GetCommercialVehicleRestrictionsWithIdParams>(
    "/GetCommercialVehicleRestrictionsWithIdAsJson",
    {
      input: getCommercialVehicleRestrictionsWithIdParamsSchema,
      output: commercialVehicleRestrictionWithIdArraySchema,
    }
  );
  return fetcher(params) as Promise<CommercialVehicleRestrictionWithId[]>;
};
