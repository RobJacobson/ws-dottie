import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { cvRestrictionDataGroup } from "./cvRestrictionData/cvRestrictionData.endpoints";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.endpoints";

export const wsdotCommercialVehicleRestrictionsApi = {
  api: apis.wsdotCommercialVehicleRestrictions,
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
} satisfies ApiDefinition;
