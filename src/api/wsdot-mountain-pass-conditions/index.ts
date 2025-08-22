// WSDOT Mountain Pass Conditions API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getMountainPassConditionById";
export * from "./getMountainPassConditions";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetMountainPassConditionByIdParams } from "./getMountainPassConditionById";
export type {
  GetMountainPassConditionsParams,
  MountainPassCondition,
  TravelRestriction,
} from "./getMountainPassConditions";
