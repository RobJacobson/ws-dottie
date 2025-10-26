import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cvRestrictionDataGroup } from "./cvRestrictionData/cvRestrictionData";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/cvRestrictionDataWithId";

export const wsdotCommercialVehicleRestrictionsApi: ApiDefinition = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
};

// Export individual resources for direct use
export { cvRestrictionDataGroup, cvRestrictionDataWithIdGroup };
