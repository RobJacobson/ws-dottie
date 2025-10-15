import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { borderCrossingDataResource } from "./borderCrossingData/borderCrossingData";

// Combine all resources into the legacy format for backward compatibility
export const wsdotBorderCrossingsApi: ApiDefinition = {
  name: "wsdot-border-crossings",
  baseUrl:
    "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(borderCrossingDataResource.endpoints),
  ],
};

// Export individual resources for direct use
export { borderCrossingDataResource };
