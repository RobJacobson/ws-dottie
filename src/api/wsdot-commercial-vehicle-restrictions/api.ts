// WSDOT Commercial Vehicle Restrictions API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

import { fetchWsdot } from "@/shared/fetching/fetchWsdot";

import type {
  CommercialVehicleRestrictionsResponse,
  CommercialVehicleRestrictionsWithIdResponse,
} from "./types";

/**
 * Get commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @returns Promise resolving to array of commercial vehicle restriction data
 */
export const getCommercialVehicleRestrictions =
  async (): Promise<CommercialVehicleRestrictionsResponse> => {
    return fetchWsdot<CommercialVehicleRestrictionsResponse>(
      "commercialVehicleRestrictions",
      "/GetCommercialVehicleRestrictionsAsJson"
    );
  };

/**
 * Get commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction.
 *
 * @returns Promise resolving to array of commercial vehicle restriction data with unique IDs
 */
export const getCommercialVehicleRestrictionsWithId =
  async (): Promise<CommercialVehicleRestrictionsWithIdResponse> => {
    return fetchWsdot<CommercialVehicleRestrictionsWithIdResponse>(
      "commercialVehicleRestrictions",
      "/GetCommercialVehicleRestrictionsWithIdAsJson"
    );
  };
