import { fetchCommercialVehicleRestrictions } from "./cvRestrictionData.endpoints";

export const useCommercialVehicleRestrictions =
  fetchCommercialVehicleRestrictions.useQuery;
