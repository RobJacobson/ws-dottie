import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { flowDataResource } from "./flowData/flowData";

// Combine all resources into the legacy format for backward compatibility
export const wsdotTrafficFlowApi: ApiDefinition = {
  name: "wsdot-traffic-flow",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(flowDataResource.endpoints),
  ],
};

// Export individual resources for direct use
export { flowDataResource };
