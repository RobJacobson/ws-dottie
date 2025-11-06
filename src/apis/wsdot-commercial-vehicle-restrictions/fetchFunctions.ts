import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotCommercialVehicleRestrictionsApi } from "./apiDefinition";

export const {
  fetchCommercialVehicleRestrictions,
  fetchCommercialVehicleRestrictionsWithId,
} = createFetchFunctions(wsdotCommercialVehicleRestrictionsApi);
