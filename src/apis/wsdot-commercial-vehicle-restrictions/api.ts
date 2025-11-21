import type { ApiDefinition } from "@/apis/types";
import { wsdotCommercialVehicleRestrictionsApiMeta } from "./apiMeta";
import { cvRestrictionDataGroup } from "./cvRestrictionData/shared/cvRestrictionData.endpoints";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/shared/cvRestrictionDataWithId.endpoints";

export const wsdotCommercialVehicleRestrictions: ApiDefinition = {
  api: wsdotCommercialVehicleRestrictionsApiMeta,
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
};
