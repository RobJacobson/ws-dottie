import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Commercial Vehicle Restrictions API
 * 
 * This API provides commercial vehicle restriction information including weight limits,
 * bridge restrictions, and other limitations across Washington State highways.
 */

// No input parameters currently needed for getCommercialVehicleRestrictions
// This schema represents an empty parameter object for consistency
export const getCommercialVehicleRestrictionsParamsSchema = z.object({}).describe(
  "No parameters required for getting commercial vehicle restriction data. The API returns all available restriction information across Washington State highways."
);

// No input parameters currently needed for getCommercialVehicleRestrictionsWithId
// This schema represents an empty parameter object for consistency
export const getCommercialVehicleRestrictionsWithIdParamsSchema = z.object({}).describe(
  "No parameters required for getting commercial vehicle restriction data with unique IDs. The API returns all available restriction information including unique identifiers for each restriction."
);

// Export the inferred types for use in API functions
export type GetCommercialVehicleRestrictionsParams = z.infer<typeof getCommercialVehicleRestrictionsParamsSchema>;
export type GetCommercialVehicleRestrictionsWithIdParams = z.infer<typeof getCommercialVehicleRestrictionsWithIdParamsSchema>;
