// WSDOT Commercial Vehicle Restrictions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/apiUtils";

import type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionWithId,
} from "./types";

// Create a factory function for WSDOT Commercial Vehicle Restrictions API
const createWsdotCommercialVehicleRestrictionsFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc"
);

/**
 * Get commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of commercial vehicle restriction data
 */
export const getCommercialVehicleRestrictions =
  createWsdotCommercialVehicleRestrictionsFetch<CommercialVehicleRestriction[]>(
    "/GetCommercialVehicleRestrictionsAsJson"
  );

/**
 * Get commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of commercial vehicle restriction data with unique IDs
 */
export const getCommercialVehicleRestrictionsWithId =
  createWsdotCommercialVehicleRestrictionsFetch<
    CommercialVehicleRestrictionWithId[]
  >("/GetCommercialVehicleRestrictionsWithIdAsJson");
