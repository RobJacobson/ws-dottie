import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cvRestrictionDataResource } from "./cvRestrictionData/cvRestrictionData";
import { cvRestrictionDataWithIdResource } from "./cvRestrictionDataWithId/cvRestrictionDataWithId";

// Combine all resources into the legacy format for backward compatibility
export const wsdotCommercialVehicleRestrictionsApi: ApiDefinition = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(cvRestrictionDataResource.endpoints),
    ...Object.values(cvRestrictionDataWithIdResource.endpoints),
  ],
};

// Export individual resources for direct use
export { cvRestrictionDataResource, cvRestrictionDataWithIdResource };
