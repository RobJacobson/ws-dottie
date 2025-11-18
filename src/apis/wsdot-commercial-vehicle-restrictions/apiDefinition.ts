import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { cvRestrictionDataGroup } from "./cvRestrictionData/shared/cvRestrictionData.endpoints";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/shared/cvRestrictionDataWithId.endpoints";

export const wsdotCommercialVehicleRestrictionsApi = {
  api: apis.wsdotCommercialVehicleRestrictions,
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
} satisfies ApiDefinition;
