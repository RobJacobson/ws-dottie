import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-travel-times",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/traveltimes/traveltimesrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { travelTimeRoutesGroup } from "./travelTimeRoutes/travelTimeRoutes.endpoints";

// Finally, construct full API definition using API constant
export const wsdotTravelTimesApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [travelTimeRoutesGroup],
} satisfies ApiDefinition;
