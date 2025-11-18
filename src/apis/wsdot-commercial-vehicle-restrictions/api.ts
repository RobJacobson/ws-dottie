import type { ApiDefinition } from "@/apis/types";
import { cvRestrictionDataGroup } from "./cvRestrictionData/shared/cvRestrictionData.endpoints";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/shared/cvRestrictionDataWithId.endpoints";

export const wsdotCommercialVehicleRestrictionsApi: ApiDefinition = {
  api: {
    name: "wsdot-commercial-vehicle-restrictions",
    baseUrl:
      "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  },
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
};
