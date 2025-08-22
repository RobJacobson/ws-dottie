// WSDOT Commercial Vehicle Restrictions API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getCommercialVehicleRestrictions";
export * from "./getCommercialVehicleRestrictionsWithId";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API

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
