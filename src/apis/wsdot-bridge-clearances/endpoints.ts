import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { bridgeClearancesResource } from "./bridgeClearances/bridgeClearances";

export const wsdotBridgeClearancesApi: ApiDefinition = {
  name: "wsdot-bridge-clearances",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  endpointGroups: [bridgeClearancesResource],
};

// Export individual resources for direct use
export { bridgeClearancesResource };
