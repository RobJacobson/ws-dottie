// WSDOT Commercial Vehicle Restrictions API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html

// API functions
export {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "./api";
// Input parameter types
export type {
  GetCommercialVehicleRestrictionsParams,
  GetCommercialVehicleRestrictionsWithIdParams,
} from "./inputs";
// Types inferred from Zod schemas
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionWithId,
  RoadwayLocation,
} from "./outputs";
// React Query hooks
export {
  useCommercialVehicleRestrictions,
  useCommercialVehicleRestrictionsWithId,
} from "./queries";
