import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { flowDataResource } from "./flowData/flowData";

export const wsdotTrafficFlowApi: ApiDefinition = {
  name: "wsdot-traffic-flow",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  endpointGroups: [flowDataResource],
};

// Export individual resources for direct use
export { flowDataResource };
