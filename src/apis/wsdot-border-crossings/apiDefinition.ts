import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-border-crossings",
  baseUrl:
    "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
} as const;

// THEN import groups (which can use API constant)
import { borderCrossingDataGroup } from "./borderCrossingData/borderCrossingData.endpoints";

// Finally, construct full API definition using API constant
export const wsdotBorderCrossingsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [borderCrossingDataGroup],
} satisfies ApiDefinition;
