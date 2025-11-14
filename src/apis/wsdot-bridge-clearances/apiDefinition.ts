import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-bridge-clearances",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
} as const;

// THEN import groups (which can use API constant)
import { bridgeClearancesGroup } from "./bridgeClearances/bridgeClearances.endpoints";

// Finally, construct full API definition using API constant
export const wsdotBridgeClearancesApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [bridgeClearancesGroup],
} satisfies ApiDefinition;
