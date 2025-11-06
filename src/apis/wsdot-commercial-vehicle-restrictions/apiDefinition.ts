import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cvRestrictionDataGroup } from "./cvRestrictionData/cvRestrictionData.endpoints";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.endpoints";

export const wsdotCommercialVehicleRestrictionsApi = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
} satisfies ApiDefinition;
