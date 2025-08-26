/**
 * WSDOT Mountain Pass Conditions API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * mountain pass condition data including weather, road conditions, and travel restrictions.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
 * API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./mountainPassConditions";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from co-located file)
export {
  getMountainPassConditionByIdParamsSchema,
  getMountainPassConditionsParamsSchema,
  mountainPassConditionSchema,
  mountainPassConditionArraySchema,
  travelRestrictionSchema,
} from "./mountainPassConditions";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetMountainPassConditionByIdParams,
  GetMountainPassConditionsParams,
  MountainPassCondition,
  TravelRestriction,
} from "./mountainPassConditions";
