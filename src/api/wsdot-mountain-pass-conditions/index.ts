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

export * from "./getMountainPassConditionById";
export * from "./getMountainPassConditions";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from single-item endpoint for consistency)
export {
  getMountainPassConditionByIdParamsSchema,
  mountainPassConditionSchema,
  travelRestrictionSchema,
} from "./getMountainPassConditionById";
// Array schemas
export {
  getMountainPassConditionsParamsSchema,
  mountainPassConditionArraySchema,
} from "./getMountainPassConditions";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetMountainPassConditionByIdParams,
  MountainPassCondition,
  TravelRestriction,
} from "./getMountainPassConditionById";
export type { GetMountainPassConditionsParams } from "./getMountainPassConditions";
