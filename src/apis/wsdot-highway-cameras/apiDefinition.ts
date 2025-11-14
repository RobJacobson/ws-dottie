import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-highway-cameras",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/highwaycameras/highwaycamerasrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { camerasGroup } from "./cameras/cameras.endpoints";

// Finally, construct full API definition using API constant
export const wsdotHighwayCamerasApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [camerasGroup],
} satisfies ApiDefinition;
