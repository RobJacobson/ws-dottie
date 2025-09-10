export * from "./getCommercialVehicleRestrictions";
export * from "./getCommercialVehicleRestrictionsWithId";

// Re-export output types from schemas
export type {
  CommercialVehiclesRestriction,
  CommercialVehiclesRestrictions,
  CommercialVehiclesRestrictionWithId,
  CommercialVehiclesRestrictionsWithId,
} from "@/schemas/wsdot-commercial-vehicle-restrictions";
