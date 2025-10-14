import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { bridgeClearancesResource } from "./bridgeClearances";

// Combine all resources into the legacy format for backward compatibility
export const wsdotBridgeClearancesApi: ApiDefinition = {
  name: "wsdot-bridge-clearances",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(bridgeClearancesResource.endpoints),
  ],
};

// Export individual resources for direct use
export { bridgeClearancesResource };
