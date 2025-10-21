import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cvRestrictionDataResource } from "./cvRestrictionData/cvRestrictionData";
import { cvRestrictionDataWithIdResource } from "./cvRestrictionDataWithId/cvRestrictionDataWithId";

export const wsdotCommercialVehicleRestrictionsApi: ApiDefinition = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  endpointGroups: [cvRestrictionDataResource, cvRestrictionDataWithIdResource],
};

// Export individual resources for direct use
export { cvRestrictionDataResource, cvRestrictionDataWithIdResource };
