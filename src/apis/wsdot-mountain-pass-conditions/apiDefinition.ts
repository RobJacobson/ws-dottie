import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-mountain-pass-conditions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { passConditionsGroup } from "./passConditions/passConditions.endpoints";

// Finally, construct full API definition using API constant
export const wsdotMountainPassConditionsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [passConditionsGroup],
} satisfies ApiDefinition;
