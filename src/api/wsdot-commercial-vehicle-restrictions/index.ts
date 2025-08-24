/**
 * WSDOT Commercial Vehicle Restrictions API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * commercial vehicle restriction data including route limitations and restrictions.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getCommercialVehicleRestrictions";
export * from "./getCommercialVehicleRestrictionsWithId";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  commercialVehicleRestrictionArraySchema,
  commercialVehicleRestrictionSchema,
  getCommercialVehicleRestrictionsParamsSchema,
} from "./getCommercialVehicleRestrictions";
export {
  commercialVehicleRestrictionWithIdSchema,
  getCommercialVehicleRestrictionsWithIdParamsSchema,
} from "./getCommercialVehicleRestrictionsWithId";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionRoadwayLocation,
  GetCommercialVehicleRestrictionsParams,
} from "./getCommercialVehicleRestrictions";
export type {
  CommercialVehicleRestrictionWithId,
  GetCommercialVehicleRestrictionsWithIdParams,
} from "./getCommercialVehicleRestrictionsWithId";
