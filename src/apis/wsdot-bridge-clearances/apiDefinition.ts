import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { bridgeClearancesGroup } from "./bridgeClearances/bridgeClearances.endpoints";

export const wsdotBridgeClearancesApi: ApiDefinition = {
  name: "wsdot-bridge-clearances",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  endpointGroups: [bridgeClearancesGroup],
};

// Export individual resources for direct use
export { bridgeClearancesGroup };
