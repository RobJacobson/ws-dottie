import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { passConditionsResource } from "./passConditions/passConditions";

export const wsdotMountainPassConditionsApi: ApiDefinition = {
  name: "wsdot-mountain-pass-conditions",
  baseUrl:
    "https://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  endpointGroups: [passConditionsResource],
};

// Export individual resources for direct use
export { passConditionsResource };
