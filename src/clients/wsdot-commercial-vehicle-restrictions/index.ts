import { defineEndpoint } from "@/shared/endpoints";
import { getCommercialVehicleRestrictionsMeta } from "./getCommercialVehicleRestrictions";
import { getCommercialVehicleRestrictionsWithIdMeta } from "./getCommercialVehicleRestrictionsWithId";

export const getCommercialVehicleRestrictions = defineEndpoint(
  getCommercialVehicleRestrictionsMeta
);
export const getCommercialVehicleRestrictionsWithId = defineEndpoint(
  getCommercialVehicleRestrictionsWithIdMeta
);

// Re-export output types from schemas
export type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictions,
  CommercialVehicleRestrictionsWithId,
  CommercialVehicleRestrictionWithId,
} from "@/schemas/wsdot-commercial-vehicle-restrictions";
// Re-export input types from client files
export type { CommercialVehicleRestrictionsInput } from "./getCommercialVehicleRestrictions";
export type { CommercialVehicleRestrictionsWithIdInput } from "./getCommercialVehicleRestrictionsWithId";
