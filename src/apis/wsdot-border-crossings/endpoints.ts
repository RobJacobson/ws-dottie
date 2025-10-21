import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { borderCrossingDataResource } from "./borderCrossingData/borderCrossingData";

export const wsdotBorderCrossingsApi: ApiDefinition = {
  name: "wsdot-border-crossings",
  baseUrl:
    "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  endpointGroups: [borderCrossingDataResource],
};

// Export individual resources for direct use
export { borderCrossingDataResource };
