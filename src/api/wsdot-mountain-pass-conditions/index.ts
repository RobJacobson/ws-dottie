// WSDOT Mountain Pass Conditions API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

// API functions
export {
  getMountainPassConditionById,
  getMountainPassConditions,
} from "./api";
// React Query hooks
export {
  useMountainPassConditionById,
  useMountainPassConditions,
} from "./queries";
// TypeScript types
export type {
  MountainPassCondition,
  MountainPassConditionsResponse,
  TravelRestriction,
} from "./types";
