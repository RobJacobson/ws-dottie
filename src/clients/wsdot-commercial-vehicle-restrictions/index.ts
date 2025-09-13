export * from "./getCommercialVehicleRestrictions";
export * from "./getCommercialVehicleRestrictionsWithId";

// Re-export output types from schemas
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictions,
  CommercialVehicleRestrictionWithId,
  CommercialVehicleRestrictionsWithId,
} from "@/schemas/wsdot-commercial-vehicle-restrictions";
