import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { cvRestrictionDataGroup } from "./cvRestrictionData/cvRestrictionData.endpoints";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId/cvRestrictionDataWithId.endpoints";

// Finally, construct full API definition using API constant
export const wsdotCommercialVehicleRestrictionsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [cvRestrictionDataGroup, cvRestrictionDataWithIdGroup],
} satisfies ApiDefinition;
