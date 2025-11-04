import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { flowDataGroup } from "./flowData/flowData.endpoints";

export const wsdotTrafficFlowApi: ApiDefinition = {
  name: "wsdot-traffic-flow",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  endpointGroups: [flowDataGroup],
};

// Export individual resources for direct use
export { flowDataGroup as flowDataResource };
