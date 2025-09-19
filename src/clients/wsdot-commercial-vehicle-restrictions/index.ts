import { getCommercialVehicleRestrictionsMeta } from "./getCommercialVehicleRestrictions";
import { getCommercialVehicleRestrictionsWithIdMeta } from "./getCommercialVehicleRestrictionsWithId";
import { defineEndpoint } from "@/shared/endpoints";

export const getCommercialVehicleRestrictions = defineEndpoint(
  getCommercialVehicleRestrictionsMeta
);
export const getCommercialVehicleRestrictionsWithId = defineEndpoint(
  getCommercialVehicleRestrictionsWithIdMeta
);

// Re-export input types from client files
export type { CommercialVehicleRestrictionsInput } from "./getCommercialVehicleRestrictions";
export type { CommercialVehicleRestrictionsWithIdInput } from "./getCommercialVehicleRestrictionsWithId";
