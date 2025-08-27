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
