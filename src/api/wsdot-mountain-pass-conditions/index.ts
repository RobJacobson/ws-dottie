// WSDOT Mountain Pass Conditions API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

// API functions
export {
  getMountainPassConditionById,
  getMountainPassConditions,
} from "./api";
// Input parameter types
export type {
  GetMountainPassConditionByIdParams,
  GetMountainPassConditionsParams,
} from "./inputs";
// Export types
export type {
  MountainPassCondition,
  TravelRestriction,
} from "./outputs";
// React Query hooks
export {
  useMountainPassConditionById,
  useMountainPassConditions,
} from "./queries";
