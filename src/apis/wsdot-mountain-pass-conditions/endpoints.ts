import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { passConditionsResource } from "./passConditions/passConditions";

// Combine all resources into the legacy format for backward compatibility
export const wsdotMountainPassConditionsApi: ApiDefinition = {
  name: "wsdot-mountain-pass-conditions",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(passConditionsResource.endpoints),
  ],
};

// Export individual resources for direct use
export { passConditionsResource };
