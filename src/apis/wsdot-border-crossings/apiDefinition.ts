import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { borderCrossingDataResource } from "./borderCrossingData/borderCrossingData.endpoints";

export const wsdotBorderCrossingsApi = {
  name: "wsdot-border-crossings",
  baseUrl:
    "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  endpointGroups: [borderCrossingDataResource],
} satisfies ApiDefinition;
