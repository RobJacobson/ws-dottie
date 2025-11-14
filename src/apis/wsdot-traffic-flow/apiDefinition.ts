import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-traffic-flow",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { flowDataGroup } from "./flowData/flowData.endpoints";

// Finally, construct full API definition using API constant
export const wsdotTrafficFlowApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [flowDataGroup],
} satisfies ApiDefinition;
